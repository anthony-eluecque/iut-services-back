import express,{ Router } from "express";
import { getItems, createItem, getPageItems, deleteItemById, updateItem } from "../controllers";

const router = Router();

router.use(express.urlencoded({ extended: false }));
router.get('/', getItems); 
// router.post('/', auth, createItem);
// router.get('/:page', auth, getPageItems);
// router.delete('/:id', auth, deleteItemById);
router.put('/', updateItem);


export default router;