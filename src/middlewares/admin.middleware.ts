import { NextFunction, Request, Response } from "express";
import Res from "../helpers/res.helper";
import messages from '../docs/messages.json';

const { notAllowed, serverError } = messages.defaults;

export const isAdmin = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!res.locals.user?.isAdmin)
            return Res.send(res, 403, notAllowed);
    
        return next();
    } catch (error) {
        return Res.send(res, 500, serverError);
    }
}