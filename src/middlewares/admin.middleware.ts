import { NextFunction, Request, Response } from "express";
import Res from "../helpers/res.helper";
import messages from '../docs/messages.json';

const { notAllowed, serverError } = messages.defaults;

/**
 * Middleware pour vérifier si l'utilisateur est un administrateur.
 * Si l'utilisateur n'est pas un administrateur, renvoie une réponse 403 (Interdit).
 * En cas d'erreur, renvoie une réponse 500 (Erreur serveur).
 *
 * @param {Request} req - L'objet de requête Express.
 * @param {Response} res - L'objet de réponse Express.
 * @param {NextFunction} next - Fonction pour passer à la prochaine fonction middleware.
 * @returns {Promise<void>} Une promesse résolue une fois le traitement terminé.
 */
export const isAdmin = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!res.locals.user?.isAdmin)
            return Res.send(res, 403, notAllowed);
    
        return next();
    } catch (error) {
        return Res.send(res, 500, serverError);
    }
};