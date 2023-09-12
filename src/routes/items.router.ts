import express,{ Router } from "express";
import { getItems, createItem } from "../controllers";

const router = Router();


router.use(express.urlencoded({ extended: false }));
router.get('/', getItems); 
router.post('/',createItem)

export default router;