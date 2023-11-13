import { CookieOptions, Response } from "express";

interface Cookie {
    name: string,
    value: string,
    options: CookieOptions
}

/**
 * Classe utilitaire pour la gestion des cookies dans Express.
 */
export default class CookieHelper {

    /**
     * Envoie un cookie dans la réponse.
     * @param {Response} res - L'objet de réponse Express.
     * @param {Cookie} cookie - Les détails du cookie à envoyer.
     */
    static send(res: Response, cookie: Cookie) {
        res.cookie(
            cookie.name,
            cookie.value,
            cookie.options
        );
    }
    
    /**
     * Efface un cookie dans la réponse.
     * @param {Response} res - L'objet de réponse Express.
     * @param {string} key - La clé du cookie à effacer.
     */
    static clear(res: Response, key: string) {
        res.clearCookie(key);
    }
}