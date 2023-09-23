import express,{ Router } from "express";
import { getItems, createItem, getPageItems, deleteItemById, updateItem, getItemsFromSelectedYear } from "../controllers";

const router = Router();


router.use(express.urlencoded({ extended: false }));
router.get('/', getItems); 
router.post('/',createItem);
router.get('/:page',getPageItems);
router.delete('/:id',deleteItemById);
router.put('/',updateItem);
router.get('/year/:year',getItemsFromSelectedYear)

export default router;