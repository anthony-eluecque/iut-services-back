import express,{ Router } from "express";
import { getItems, createItem, getPageItems, deleteItemById, updateItem, getItemsFromSelectedYear, getItemFilter} from "../controllers";

const router = Router();


router.use(express.urlencoded({ extended: false }));
router.get('/', getItems); 
router.post('/',createItem);
router.get('/:page',getPageItems);
router.delete('/:id',deleteItemById);
router.put('/',updateItem);
router.get('/year/:year',getItemsFromSelectedYear)
/******************************************/ 
router.post('/search',getItemFilter)
export default router;
