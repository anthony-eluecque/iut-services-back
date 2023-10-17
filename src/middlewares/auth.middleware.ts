import { NextFunction, Request, Response } from "express"
import jwt, { JwtPayload } from 'jsonwebtoken';
import Res from "../helpers/res.helper";
import { AppDataSource } from "../config/data-source";
import { User } from "../entities";
import messages from '../docs/messages.json';

const { serverError, unAuth } = messages.defaults
const usersRepository = AppDataSource.getRepository(User);

export const isAuth = async (req : Request, res : Response, next : NextFunction) => {
    try {
        const { token } = req.cookies;

        if (!token) return Res.send(res,401,unAuth);
    
        const { id } = jwt.verify(token, process.env.JWT_SECRET) as JwtPayload;
        const user = await usersRepository.findOne({where : { id : id }});
        if (!user) return Res.send(res,401, unAuth + ', User not found');

        res.locals.user = user;

        return next();

    } catch (error) {
        return Res.send(res, 500, serverError);
    }
}