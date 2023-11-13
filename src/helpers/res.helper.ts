import { Response } from 'express';


/**
 * Classe utilitaire pour la gestion des réponses dans Express.
 */
export default class Res {

    /**
     * Envoie une réponse JSON avec le code HTTP, le message et les données spécifiés.
     * @param {Response} res - L'objet de réponse Express.
     * @param {number} httpCode - Le code HTTP à utiliser dans la réponse.
     * @param {string} message - Le message à inclure dans la réponse.
     * @param {any} [data] - Les données à inclure dans la réponse (optionnel).
     * @returns {Response} L'objet de réponse Express.
     */
    static send(res: Response, httpCode: number, message: string, data?: any) {
        res.statusCode = httpCode;
        res.statusMessage = message;

        return res.json({
            data
        });
    }
}