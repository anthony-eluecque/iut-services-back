import { NextFunction, Request, Response } from "express"
import jwt, { JwtPayload } from 'jsonwebtoken';
import Res from "../helpers/res.helper";
import { AppDataStore } from "../config";
import { User } from "../entities";
import messages from '../docs/messages.json';

const { serverError, unAuth } = messages.defaults

/**
 * Middleware pour vérifier l'authentification de l'utilisateur.
 * Vérifie la présence d'un token dans les cookies, et s'assure que l'utilisateur
 * correspondant à ce token existe dans la base de données. Ajoute l'utilisateur à res.locals.user pour un accès ultérieur.
 * En cas de succès, passe à la prochaine fonction middleware.
 * Si le token est manquant, renvoie une réponse 401 (Non autorisé).
 * Si l'utilisateur n'est pas trouvé, renvoie une réponse 401 (Non autorisé) avec un message indiquant que l'utilisateur n'a pas été trouvé.
 * En cas d'erreur, renvoie une réponse 500 (Erreur serveur).
 *
 * @param {Request} req - L'objet de requête Express.
 * @param {Response} res - L'objet de réponse Express.
 * @param {NextFunction} next - Fonction pour passer à la prochaine fonction middleware.
 * @returns {Promise<void>} Une promesse résolue une fois le traitement terminé.
 */
export const isAuth = async (req : Request, res : Response, next : NextFunction) => {
    try {
        const usersRepository = AppDataStore.getRepository(User);

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