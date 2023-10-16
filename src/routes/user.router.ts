import express,{ Router } from "express";
import { getUsers, createUser } from "../controllers";
import { getUser } from "../controllers/user.controller";

const router = Router();


router.use(express.urlencoded({ extended: false }));
router.get('/', getUsers); 
router.post('/',createUser);
router.get('/:id',getUser);

export default router;