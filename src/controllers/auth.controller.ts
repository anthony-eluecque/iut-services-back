import { Request, Response } from 'express';
import Res from '../helpers/res.helper';
import { generateRefreshToken, verifyUserAndGenerateTokenAndRefresh } from '../services/auth.service';

export const generateTokenAndRefreshToken = async (req : Request, res : Response) => {
    try {
        const { email, password} = req.body;    
        const token = await verifyUserAndGenerateTokenAndRefresh(email, password);
        const refreshToken = await generateRefreshToken(email);

        if (token) {
            return  res.status(200).json({token, refreshToken});
        }

        return Res.send(res, 404, "Erreur", {error: "L'utilisateur ou le mot de passe n'existe pas"});

    } catch (error) {
        return Res.send(res,500, 'Internal Server error');
    }
}
