import express,{ Router } from "express";
import { getItems, createItem, getPageItems, deleteItemById, updateItem } from "../controllers";

const router = Router();


router.use(express.urlencoded({ extended: false }));
router.get('/', getItems); 
router.post('/',createItem);
router.get('/:page',getPageItems);
router.delete('/:id',deleteItemById);
router.put('/',updateItem);


export default router;