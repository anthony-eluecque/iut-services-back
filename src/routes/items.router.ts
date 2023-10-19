import express,{ Router } from "express";
import { getItems, createItem, deleteItemById, updateItem, getItemFilterPage} from "../controllers";
import { isAuth } from "../middlewares/auth.middleware";
import { isAdmin } from "../middlewares/admin.middleware";

const router = Router();

router.use(express.urlencoded({ extended: false }));
router.get('/',isAuth,isAdmin,getItems); 
router.post('/',isAuth,createItem);
router.get('/:page',isAuth,getItemFilterPage)
router.delete('/:id',isAuth,deleteItemById);
router.put('/',isAuth,updateItem);
/******************************************/ 
export default router;
