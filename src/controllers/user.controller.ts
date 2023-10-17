import { Request, Response } from 'express';
import { User } from '../entities';
import { AppDataSource } from '../config/data-source';
import Res from '../helpers/res.helper';
import { hashPassword } from '../services/hash.service';
import CryptoJS, { AES } from "crypto-js";
import { generateConnectionToken, verifyPassword } from '../services/auth.service';
import messages from '../docs/messages.json'


const { serverError } = messages.defaults
const usersRepository = AppDataSource.getRepository(User);

var key = "PasswordText";

export const getUsers = async (req : Request, res : Response) => {
    try {
        const users = await usersRepository.find({});
        return Res.send(res,200,'Success',users);
    } catch (error) {
        return Res.send(res,500,'Internal Server error');
    }
};

export const getUser = async (req : Request, res: Response) => {
    try {
        const user = await usersRepository.findOne({where : {
            id : req.params.id
        }})

        if (!user){
            return Res.send(res,404,'User Not Found');
        }

        const decryptedUser = {
            email : user.email,
            password : user.password,
            firstName : AES.decrypt(user.firstName,key).toString(CryptoJS.enc.Utf8),
            lastName : AES.decrypt(user.lastName,key).toString(CryptoJS.enc.Utf8)
        }

        return Res.send(res,200,'Got one',decryptedUser);
    } catch (error) {
        return Res.send(res,500,'Internal Server error',error);
    }
}

export const createUser = async (req: Request, res: Response) => {
    try {
        const hashPwd = await hashPassword(req.body.password)
        
        
        const userEncrypted = {
            email : req.body.email,
            password : hashPwd,
            firstName : AES.encrypt(req.body.firstName,key).toString(),
            lastName : AES.encrypt(req.body.lastName,key).toString()
        }


        const userFinded = await usersRepository.findOne({where : { email : userEncrypted.email}})
        if (userFinded){
            return Res.send(res,409,'User already exist',userFinded)
        } 
        const newUser = new User();
        await usersRepository.merge(newUser,userEncrypted).save()

        return Res.send(res,200,'User has been created',userEncrypted)
    } catch (error) {
        console.error(error)
        return Res.send(res,500,'Internal Server error',error);
    }
};

//#region  AUTH 

export const login = async (req : Request , res : Response) => {
    try {
        const { email,password } = req.body

        
        // Gérer si ils sont pas renseigné mais osef pour l'instant

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


export const authenticate = async (req: Request, res: Response) => {
    try {
        if (!res.locals.user)
            return Res.send(res, 401, "unAuth");

        return Res.send(res, 200, "auth", res.locals.user);
    } catch (error) {
        return Res.send(res, 500, serverError);
    }
}

//#endregion