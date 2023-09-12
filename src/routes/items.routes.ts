import express,{ Router } from "express";
import { Service } from "../models";
import { createItem, deleteItem, getAllItems, getItems, updateItem } from "../controllers";

const router = Router();


router.use(express.urlencoded({ extended: false }));

router.get('/',getAllItems); 
router.get('/:page',getItems); // Pagination
router.post('/',createItem);
router.delete('/:id',deleteItem);
router.put('/',updateItem)


export default router;