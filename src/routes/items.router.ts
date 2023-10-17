import express,{ Router } from "express";
import { getItems, createItem, deleteItemById, updateItem, getItemFilterPage} from "../controllers";

const router = Router();

router.use(express.urlencoded({ extended: false }));
router.get('/', getItems); 
router.post('/',createItem);
router.get('/:page',getItemFilterPage)
router.delete('/:id',deleteItemById);
router.put('/',updateItem);
/******************************************/ 
export default router;
