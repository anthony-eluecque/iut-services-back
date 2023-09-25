import { AppDataSource } from "../config/data-source";
import { User } from "../entities";
import jwt from "jsonwebtoken"
import md5 from "md5"

const usersRepository = AppDataSource.getRepository(User);

export const verifyUserAndGenerateTokenAndRefresh = async (email, password) => {
	try {
		let token = null;
		// Vérification que l'utilisateur existe bien avec son email et mot de passe
        const user = await usersRepository.findOne({ where: { email, password: md5(password)}});

		if (user != null) {
			// On génère un token
		   token = jwt.sign({email}, process.env.TOKEN_SECRET, { expiresIn: '600s' });
		}
	
		return token;
	} catch (e) {
		console.log(e);
		throw  e;
	}
}

export const generateRefreshToken = async (email) => {
	try {
		let refreshToken = null;

		if (email != null) {
			// On génère un token
			refreshToken = jwt.sign({email}, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '99960s' });
		}
	
		return refreshToken;
	} catch (e) {
		console.log(e);
		throw  e;
	}
}



