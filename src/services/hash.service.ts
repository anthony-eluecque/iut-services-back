import { hash } from 'bcrypt';

export const hashPassword = async (data : string) => {
    try {
        const hashPwd = hash(data,parseInt(process.env.BCRYPT_SALTROUND));
        return hashPwd;
    } catch (error) {
        console.error(error);
        throw error;
    }
}
