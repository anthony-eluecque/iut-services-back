import express,{ Router } from "express";
import { generateTokenAndRefreshToken } from "../controllers/auth.controller";

const router = Router();

router.use(express.urlencoded({ extended: false }));
router.post('/', generateTokenAndRefreshToken)

export default router;