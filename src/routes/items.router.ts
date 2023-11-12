import express,{ Router } from "express";
import { getItems, createItem, deleteItemById, updateItem, getItemFilterPage, getItemById, deleteTypeFromItem} from "../controllers";
import { isAuth } from "../middlewares/auth.middleware";
import { isAdmin } from "../middlewares/admin.middleware";

const router = Router();
/**
 * @swagger
 * tags:
 *   name: Items
 *   description: Operations on items
 */
router.use(express.urlencoded({ extended: false }));


/**
 * @swagger
 * /items:
 *   get:
 *     summary: Get a list of items
 *     tags: [Items]
 *     description: Retrieve a list of items.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of items
 *       500:
 *         description: Internal Server Error
 */
router.get('/',isAuth,isAdmin,getItems); 
router.post('/',isAuth,createItem);
router.get('/:page',isAuth,getItemFilterPage);
router.delete('/:id',isAuth,deleteItemById);
router.put('/',isAuth,updateItem);
router.get('/item/:id',isAuth,getItemById);
router.delete('/item/types/:id',isAuth,deleteTypeFromItem);
export default router;
