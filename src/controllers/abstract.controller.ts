import { Request, Response } from "express";
import { Repository } from "typeorm";
import Res from "../helpers/res.helper";

/**
 * Récupère toutes les entités du référentiel spécifié avec éventuellement des relations.
 *
 * @param {Request} req - L'objet de requête Express.
 * @param {Response} res - L'objet de réponse Express.
 * @param {Repository<T>} repository - Le référentiel (repository) à partir duquel récupérer les entités.
 * @param {string[]} [relations] - Les relations à inclure lors de la récupération des entités.
 * @returns {Promise<Response>} Une promesse résolue avec la réponse indiquant la réussite de la récupération des entités ou un message d'erreur en cas d'échec.
 * @template T - Le type d'entité du référentiel.
 */
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
        return Res.send(res,500,'Internal Server error',error);
    }
};
