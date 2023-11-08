import { Request, Response } from 'express';
import { User, validateUser } from '../entities';
import { AppDataStore } from '../config';
import Res from '../helpers/res.helper';
import { hashPassword } from '../services/hash.service';
import CryptoJS, { AES } from "crypto-js";
import { changePasswordUser, forgotPasswordUser, generateConnectionToken, resetPasswordUser, verifyPassword } from '../services/auth.service';
import messages from '../docs/messages.json'
import { validate } from "class-validator";
import { decryptData, encryptData } from '../services/aes.service';
import CookieHelper from '../helpers/cookie.helper';
import { validationResult } from 'express-validator';
import { contextsKey } from 'express-validator/src/base';
import { ILike } from 'typeorm';

const { serverError } = messages.defaults

export const getUsers = async (req : Request, res : Response) => {
    try {
        const usersRepository = AppDataStore.getRepository(User);

        const users = await usersRepository.find({});
        return Res.send(res,200,'Success',users);
    } catch (error) {
        return Res.send(res,500,'Internal Server error');
    }
};

export const getUserFilterPage = async (req: Request, res: Response) => {
    try {
        const usersRepository = AppDataStore.getRepository(User);
        const page = parseInt(req.params.page) || 1;
        const pageCount = 5;
        const skip = (page - 1) * pageCount;
        const { firstName, lastName, email } = req.query;
        let where = {
            email: email != '' && email ? ILike('%' + email + '%') : null,
            isAdmin: false,
        };
        let [users, _] = await usersRepository.findAndCount({
            skip,
            where
        });

        if (firstName || lastName) {
            users = users.filter(user => {
                const decryptedFirstName = user.firstName ? decryptData(user.firstName).toString(CryptoJS.enc.Utf8) : '';
                const decryptedLastName = user.lastName ? decryptData(user.lastName).toString(CryptoJS.enc.Utf8) : '';
                return (!firstName || decryptedFirstName === firstName) && (!lastName || decryptedLastName === lastName);
            });
        }

        users.forEach(user => {
            user.firstName = decryptData(user.firstName).toString(CryptoJS.enc.Utf8);
            user.lastName = decryptData(user.lastName).toString(CryptoJS.enc.Utf8);
        });

        return Res.send(res, 200, 'Success', { users: users, count: users.length });
    } catch (error) {
        return Res.send(res, 500, 'Internal Server error');
    }
}

export const getUser = async (req : Request, res: Response) => {
    try {
        const usersRepository = AppDataStore.getRepository(User);

        const user = await usersRepository.findOne({where : {
            id : req.params.id
        }})

        if (!user){
            return Res.send(res,404,'User Not Found');
        }

        const decryptedUser = {
            email : user.email,
            password : user.password,
            firstName : decryptData(user.firstName).toString(CryptoJS.enc.Utf8),
            lastName : decryptData(user.lastName).toString(CryptoJS.enc.Utf8)
        }

        return Res.send(res,200,'Got one',decryptedUser);
    } catch (error) {
        return Res.send(res,500,'Internal Server error',error);
    }
}

export const createUser = async (req: Request, res: Response) => {
    try {
        const usersRepository = AppDataStore.getRepository(User);
        
        const { email, password, firstName, lastName } = req.body;
        
        const userFinded = await usersRepository.findOne({where : { email : email}})
        if (userFinded){
            return Res.send(res,409,'User already exist',userFinded)
        } 
        const hashPwd = await hashPassword(password)
        const newUser = usersRepository.create({
            email : email,
            firstName : encryptData(firstName).toString(),
            lastName : encryptData(lastName).toString(),
            password : hashPwd
        });

        const isValidatedUser = await validate(newUser)
        if (!isValidatedUser) return Res.send(res,400,"User not validated");

        await usersRepository.insert(newUser);

        return Res.send(res,200,'User has been created',newUser)
    } catch (error) {
        return Res.send(res,500,serverError);
    }
};

export const updateUser = async (req: Request, res: Response) => {
    try {
        const usersRepository = AppDataStore.getRepository(User);

        const { id } = req.body;
        const { isAdmin } = res.locals.user;
        const idUser = res.locals.user.id?.toString()?.toString()

        if (idUser != id && !isAdmin) 
            return Res.send(res,403,"Not allowed");
        // Admin part (Only admin can edit roles)
        
        const errors = validationResult(req);
        if (!errors.isEmpty()) return Res.send(res,400,"wrong input");

        const oldUser = await usersRepository.findOne({where : { id : id}});
        if (!oldUser) return Res.send(res,404,"Not Found");

        // Check if user try to edit another user

        const { firstName, lastName} = req.body;

        // Validator
        const newUser = usersRepository.create({
            email : oldUser.email,
            firstName : encryptData(firstName).toString(),
            lastName : encryptData(lastName).toString(),
            password : oldUser.password,
            isAdmin : oldUser.isAdmin
        });;
        const isValidatedUser = await validate(newUser);
        if (isValidatedUser.length > 0) return Res.send(res,400,"User not validated");

        // Update
        await usersRepository.update({
            firstName : oldUser.firstName,
            lastName : oldUser.lastName
        },{
            firstName : encryptData(firstName).toString(),
            lastName: encryptData(lastName).toString()
        })
        
        return Res.send(res,204,"User has been Updated");

    } catch (error) {
        return Res.send(res,500,serverError,error);
    }
}

export const deleteUser = async (req: Request, res: Response) => {
    try {
        const usersRepository = AppDataStore.getRepository(User);

        const { id } = req.params;

        // Accès au user depuis ça pour la partie admin : 
        // const { _id , isAdmin } = res.locals.user;

        await usersRepository.delete({id})
        return Res.send(res,204,"deleted")

    } catch (error) {
        return Res.send(res,500,serverError)
    }
}

//#region  AUTH 

export const resetPassword =async (req: Request, res: Response) => {
    try {
        if (!req.body.password) return Res.send(res,400,"Incorrect inputs")

        await resetPasswordUser(req, res);
    } catch (error) {
        console.log(error)
        return Res.send(res,500,serverError)
    }
} 

export const forgotPassword  = async(req: Request, res: Response) => {
    try {
        if (!req.body.email) return Res.send(res,400,"Incorrect inputs");

        forgotPasswordUser(req, res);
    } catch (error) {
        return Res.send(res,500,serverError)
    }
} 

export const changePassword = async(req: Request, res: Response) => {
    try {
        const { password, token } = req.body;
        if (!password || !token) return Res.send(res,400,"Incorrect inputs");

        changePasswordUser(req, res);
    } catch (error) {
        return Res.send(res,500,serverError)
    }
}

export const login = async (req : Request , res : Response) => {
    try {
        const usersRepository = AppDataStore.getRepository(User);

        const { email,password } = req.body

        if (!email || !password)  return Res.send(res,400,"Incorrect inputs")
        
        const user = await usersRepository.findOne({where :{
            email : email
        }})
        if (!user) return Res.send(res,400,"User not found");
  
        const matchedPassword = await verifyPassword(user,password);

        if (!matchedPassword) return Res.send(res,400,"Invalid password");

        return await generateConnectionToken(user,res)

    } catch (error) {
        throw error;        
    }
}

export const logout = async (req : Request, res: Response) => {
    try {
        CookieHelper.clear(res,'token');
        return Res.send(res,204,"User has been logout");
    } catch (error) {
        return Res.send(res,500,serverError);
    }
}

export const authenticate = async (req: Request, res: Response) => {
    try {
        if (!res.locals.user) return Res.send(res, 401, "unAuth");

        return Res.send(res, 200, "auth", res.locals.user);
    } catch (error) {
        return Res.send(res, 500, serverError);
    }
}



//#endregion