import { Request, Response } from "express";
import { Repository } from "typeorm";
import Res from "../helpers/res.helper";

export const getAll = async <T>(
    req: Request,
    res: Response,
    repository: Repository<T>,
    relations?: string[]
) => {
    try {
        const entities = await repository.find({
            relations,
        });
        return Res.send(res,200,'Successfully fetched data',entities);
    } catch (error) {
        return Res.send(res,500,'Internal Server error');
    }
};
