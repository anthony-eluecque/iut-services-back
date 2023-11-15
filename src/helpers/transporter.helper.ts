import { User } from "../entities";
import nodemailer from 'nodemailer';
import { decryptData } from "../services/aes.service";
import Res from "../helpers/res.helper";
import { CookieOptions, Request, Response } from "express";
import CryptoJS from "crypto-js";

interface Transporter {
    email: string,
    subject: string,
    html: string
}

export default class TransporterSendMail {

    static async sendMail(req: Request, res: Response, transporte: Transporter) {
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

        const mailOptions = {
            from: process.env.FROM_EMAIL,
            to: transporte.email,
            subject: transporte.subject,
            html: transporte.html,
        };
    
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return Res.send(res, 500, "Problème envoi mail  !");   
            }
            
            return Res.send(res, 200, "Envoi mail  !");   
        });
    }
    
}