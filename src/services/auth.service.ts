import { CookieOptions, Request, Response } from "express";
import { User } from "../entities";
import jwt, { JwtPayload } from 'jsonwebtoken';
import CookieHelper from '../helpers/cookie.helper';
import Transporter from '../helpers/transporter.helper';
import Res from "../helpers/res.helper";
import { compare } from "bcrypt";
import nodemailer from 'nodemailer';
import { decryptData } from "./aes.service";
import CryptoJS from "crypto-js";
import { hashPassword } from "./hash.service";
import { AppDataStore } from "../config";
import { create } from "ts-node";

/**
 * Génère un jeton de connexion pour un utilisateur et l'envoie dans un cookie.
 *
 * @param {User} user - L'utilisateur pour lequel générer le jeton.
 * @param {Response} res - L'objet de réponse pour envoyer le cookie.
 * @returns {Promise<void>} Une promesse résolue lorsque le jeton est généré et le cookie est envoyé.
 */
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
};

/**
 * Envoie un e-mail de réinitialisation de mot de passe à l'utilisateur.
 *
 * @param {Request} req - L'objet de requête express.
 * @param {Response} res - L'objet de réponse express.
 * @returns {Promise<void>} Une promesse résolue une fois que l'e-mail est envoyé.
 */
export const forgotPasswordUser = async(req: Request, res: Response) => {
    const usersRepository = AppDataStore.getRepository(User);
    const { email } = req.body;
    const user = await usersRepository.findOne({where : { email }});

    if (!user) {
        return Res.send(res, 404, null, "L'utilisateur n'existe pas");
    }
    const tokenPassword = await jwt.sign({id: user.id}, process.env.JWT_RESET_PASSWORD_SECRET, {expiresIn: '300s'});
    const firstName = decryptData(user.firstName).toString(CryptoJS.enc.Utf8);
    const lastName = decryptData(user.lastName).toString(CryptoJS.enc.Utf8);

    Transporter.sendMail(req, res, {
        email: user.email,
        subject: 'Réinitialisation de votre mot de passe',
        html: `<p>Bonjour ${firstName} ${lastName} !</p><p>Pour changer votre mot de passe de IUT Services, cliquer <a href="${process.env.CORS_ORIGIN}/changePassword?token=${tokenPassword}">ICI</a>`
    })
    // await sendMailResetPassword(req, res, user);
};


/**
 * Réinitialise le mot de passe de l'utilisateur à partir d'un jeton de réinitialisation.
 *
 * @param {Request} req - L'objet de requête express.
 * @param {Response} res - L'objet de réponse express.
 * @returns {Promise<void>} Une promesse résolue une fois que le mot de passe est réinitialisé.
 */
export const resetPasswordUser = async(req: Request, res: Response) => {
    const usersRepository = AppDataStore.getRepository(User);

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
    const tokenPassword = await jwt.sign({id: user.id}, process.env.JWT_RESET_PASSWORD_SECRET, {expiresIn: '300s'});
    const firstName = decryptData(user.firstName).toString(CryptoJS.enc.Utf8);
    const lastName = decryptData(user.lastName).toString(CryptoJS.enc.Utf8);

    Transporter.sendMail(req, res, {
        email: user.email,
        subject: 'Réinitialisation de votre mot de passe',
        html: `<p>Bonjour ${firstName} ${lastName} !</p><p>Pour changer votre mot de passe de IUT Services, cliquer <a href="${process.env.CORS_ORIGIN}/changePassword?token=${tokenPassword}">ICI</a>`
    })
    // await sendMailResetPassword(req, res, user);
};

/**
 * Envoie un e-mail de réinitialisation de mot de passe à l'utilisateur.
 *
 * @param {Request} req - L'objet de requête express.
 * @param {Response} res - L'objet de réponse express.
 * @param {User} user - L'utilisateur pour lequel envoyer l'e-mail de réinitialisation.
 * @returns {Promise<void>} Une promesse résolue une fois que l'e-mail est envoyé.
 */
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
};

/**
 * Change le mot de passe de l'utilisateur à partir d'un jeton de réinitialisation.
 *
 * @param {Request} req - L'objet de requête express.
 * @param {Response} res - L'objet de réponse express.
 * @returns {Promise<void>} Une promesse résolue une fois que le mot de passe est changé.
 */
export const changePasswordUser = async(req: Request, res: Response) => {
    const usersRepository = AppDataStore.getRepository(User);

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
};

/**
 * Vérifie si le mot de passe fourni correspond au mot de passe de l'utilisateur.
 *
 * @param {User} user - L'utilisateur dont le mot de passe doit être vérifié.
 * @param {string} password - Le mot de passe à vérifier.
 * @returns {Promise<boolean>} Une promesse résolue avec la valeur booléenne indiquant si les mots de passe correspondent.
 */
export const verifyPassword = async (user : User, password : string ): Promise<boolean> => {
	return compare(password,user.password);
};


