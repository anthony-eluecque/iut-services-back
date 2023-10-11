import express,{ Router } from "express";
import { getItems, createItem, deleteItemById, updateItem, getItemFilterPage} from "../controllers";

const router = Router();

router.use(express.urlencoded({ extended: false }));
router.get('/', getItems); 
router.get('/:page',getItemFilterPage)
router.post('/',createItem);
router.delete('/:id',deleteItemById);
router.put('/',updateItem);
/******************************************/ 
export default router;
