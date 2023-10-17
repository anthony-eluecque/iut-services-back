import express,{ Router } from "express";
import { getUsers, createUser, authenticate , login, getUser } from "../controllers";
import { isAuth } from "../middlewares/auth.middleware";

const router = Router();


router.get('/',isAuth, getUsers); 
router.post('/', createUser);


router.get('/auth', isAuth, authenticate);
router.post('/login', login);

router.get('/:id',isAuth,getUser);

export default router;