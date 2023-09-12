import { Request, Response } from 'express';
import { User } from '../entities';
import { AppDataSource } from '../config/data-source';
import Res from '../helpers/res.helper';

export const getUsers = async (req : Request, res : Response) => {
    try {
        const user = await AppDataSource.manager.find(User);
        return Res.send(res,200,'Success',user);
    } catch (error) {
        return Res.send(res,500,'Internal Server error');
    }
}

export const createUser = async (req: Request, res: Response) => {
    try {
        const { firstName, lastName, age } = req.body;       
        let user = new User();
        user.firstName = "firstName";
        user.lastName = "lastName";
        user.age = 15;
        await AppDataSource.manager.save(user)
        return Res.send(res,200,'',user);
    } catch (error) {
        return Res.send(res,500,'Internal Server error');
    }
}