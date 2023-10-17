import { CookieOptions, Response } from "express";
import { User } from "../entities";
import jwt from "jsonwebtoken"
import CookieHelper from '../helpers/cookie.helper'
import Res from "../helpers/res.helper";
import { compare } from "bcrypt";


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


export const verifyPassword = async (user : User, password : string ) => {
	return compare(password,user.password);
}

