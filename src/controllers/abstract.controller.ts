import { Response, Request } from 'express';
import { Model, Schema } from 'mongoose';

export const getAll = async (req: Request, res : Response, model : Model<any>) => {
    try {
        res.status(200).json(await model.find({}));
    } catch (error) {
        console.log("Error (getAll) : ", error);
        res.status(500).json({error : "Error : getAll"});
    }
}