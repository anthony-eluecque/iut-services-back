import express,{ Router } from "express";
import { getUsers, createUser } from "../controllers";

const router = Router();


router.use(express.urlencoded({ extended: false }));
router.get('/', getUsers); 
router.post('/',createUser)

export default router;