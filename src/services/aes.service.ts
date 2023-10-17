import CryptoJS, { AES } from "crypto-js";
import dotenv from 'dotenv';
dotenv.config();

const KEY = process.env.AES_SECRET;

export const encryptData = (data : any) => {
    return AES.encrypt(data,KEY)
}

export const decryptData = (data : any) => {
    return AES.decrypt(data,KEY)
}

