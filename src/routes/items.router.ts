import express,{ Router } from "express";
import { getItems, createItem, getPageItems, deleteItemById, updateItem } from "../controllers";

const router = Router();
const auth = require('../middlewares/auth');

router.use(express.urlencoded({ extended: false }));
router.get('/', auth, getItems); 
// router.post('/', auth, createItem);
// router.get('/:page', auth, getPageItems);
// router.delete('/:id', auth, deleteItemById);
router.put('/', auth, updateItem);


export default router;