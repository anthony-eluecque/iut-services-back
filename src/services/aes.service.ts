import CryptoJS, { AES } from "crypto-js";
import dotenv from 'dotenv';
dotenv.config();

const KEY = process.env.AES_SECRET;

/**
 * Fonction pour encrypter les données en utilisant l'algorithme AES.
 *
 * @param {any} data - Les données à encrypter.
 * @returns {any} Les données encryptées.
 */
export const encryptData = (data : any) => {
    return AES.encrypt(data,KEY)
}

/**
 * Fonction pour décrypter les données encryptées en utilisant l'algorithme AES.
 *
 * @param {any} data - Les données encryptées à décrypter.
 * @returns {any} Les données décryptées.
 */
export const decryptData = (data : any) => {
    return AES.decrypt(data,KEY)
}

