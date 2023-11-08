import { CookieOptions, Request, Response } from "express";
import { User } from "../entities";
import jwt, { JwtPayload } from 'jsonwebtoken';
import CookieHelper from '../helpers/cookie.helper'
import Res from "../helpers/res.helper";
import { compare } from "bcrypt";
import { AppDataSource } from '../config/data-source';
import { matchedData } from "express-validator";
import nodemailer from 'nodemailer';
import { decryptData } from "./aes.service";
import CryptoJS from "crypto-js";
import { hashPassword } from "./hash.service";
const usersRepository = AppDataSource.getRepository(User);

export const generateConnectionToken = async (user: User, res: Response) => {
    const token = await jwt.sign({id: user.id}, process.env.JWT_SECRET);
    const options: CookieOptions = {
        httpOnly: true,
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
        path: '/'
    };

    CookieHelper.send(res, {
        name: 'token',
        value: token,
        options
    });

    return Res.send(res, 204, "");
}

export const forgotPasswordUser = async(req: Request, res: Response) => {
    const { email } = req.body;
    const user = await usersRepository.findOne({where : { email }});

    if (!user) {
        return Res.send(res, 404, null, "L'utilisateur n'existe pas");
    }

    await sendMailResetPassword(req, res, user);
}

export const resetPasswordUser = async(req: Request, res: Response) => {
    const { token } = req.cookies;
    const { id } = jwt.verify(token, process.env.JWT_SECRET) as JwtPayload;
    const { password } = req.body;

    const user = await usersRepository.findOne({where : { id }});

    if (!user) {
       return Res.send(res, 404, null, "L'utilisateur n'existe pas");
    }

    const matchedPassword = await verifyPassword(user, password);

    if (!matchedPassword) {
        return Res.send(res, 404, null, "Le mot de passe n'est pas correct");

    }

    await sendMailResetPassword(req, res, user);
}

const sendMailResetPassword = async(req: Request, res: Response, user: User) => {
    const tokenPassword = await jwt.sign({id: user.id}, process.env.JWT_RESET_PASSWORD_SECRET, {expiresIn: '300s'});

    const transporter = nodemailer.createTransport({
        host: process.env.SERVER_SMTP,
        port: process.env.PORT_SMTP,
        secure: true,
        service:process.env.TYPE_SERVICE,
        auth: {
            user: process.env.LOGIN_EMAIL,
            pass: process.env.PASSWORD_EMAIL,
        },
    });
    module.exports = { transporter };
    
    const firstName = decryptData(user.firstName).toString(CryptoJS.enc.Utf8);
    const lastName = decryptData(user.lastName).toString(CryptoJS.enc.Utf8);

    const mailOptions = {
        from: process.env.FROM_EMAIL,
        to: user.email,
        subject: 'Réinitialisation de votre mot de passe',
        html: `<p>Bonjour ${firstName} ${lastName} !</p><p>Pour changer votre mot de passe de IUT Services, cliquer <a href="${process.env.CORS_ORIGIN}/changePassword?token=${tokenPassword}">ICI</a>`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return Res.send(res, 500, "Problème envoi mail réinitialisation !");   
        }
        
        return Res.send(res, 200, "Envoi mail réinitialisation !");   
    });
}

export const changePasswordUser = async(req: Request, res: Response) => {
    const { password, token } = req.body;
    const { id } = jwt.verify(token, process.env.JWT_RESET_PASSWORD_SECRET) as JwtPayload;
    const user = await usersRepository.findOne({where : { id }});

    if (!user) {
       return Res.send(res, 204, "Erreur");
    }

    // Update password
    const hashPwd = await hashPassword(password);

    await usersRepository.update(
        {
            id
        },
        {
            password : hashPwd
        });

    return Res.send(res, 200, "Mot de passe modifié !");     
}

export const verifyPassword = async (user : User, password : string ): Promise<boolean> => {
	return compare(password,user.password);
}


