import { hash } from 'bcrypt';


/**
 * Hache le mot de passe en utilisant l'algorithme de hachage bcrypt avec le nombre de tours spécifié.
 *
 * @param {string} data - Le mot de passe à hacher.
 * @returns {Promise<string>} Une promesse résolue avec le mot de passe haché.
 * @throws {Error} Une erreur si la fonction de hachage échoue.
 */
export const hashPassword = async (data : string) => {
    const hashPwd = hash(data,parseInt(process.env.BCRYPT_SALTROUND));
    return hashPwd;
};
