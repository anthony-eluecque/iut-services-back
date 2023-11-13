import express,{ Router } from "express";
import { getItems, createItem, deleteItemById, updateItem, getItemFilterPage, getItemById, deleteTypeFromItem} from "../controllers";
import { isAuth } from "../middlewares/auth.middleware";
import { isAdmin } from "../middlewares/admin.middleware";

/**
 * @swagger
 * tags:
 *   name: Items
 *   description: Opérations sur les items de l'application
 */
const router = Router();

router.use(express.urlencoded({ extended: false }));

/**
 * @swagger
 * /items:
 *   get:
 *     summary: Récupère la liste de tous les items.
 *     tags: [Items]
 *     description: Récupère une liste de tous les items enregistrés.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Liste des items récupérée avec succès.
 *       401:
 *         description: Non autorisé. L'utilisateur doit être authentifié
 *       403:
 *         description: L'utilisateur doit avoir des privilèges d'administrateur.
 *       500:
 *         description: Erreur interne du serveur.
 */
router.get('/',isAuth,isAdmin,getItems);

/**
 * @swagger
 * /items:
 *   post:
 *     summary: Crée un nouvel item.
 *     tags: [Items]
 *     description: Crée un nouvel item.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - types
 *               - lesson
 *               - service
 *             properties:
 *               types:
 *                 type: array
 *                 items:
 *                   type: object
 *                   required:
 *                     - name
 *                     - amountHours
 *                   properties:
 *                     name:
 *                       type: string
 *                     amountHours:
 *                       type: number
 *               lesson:
 *                 type: object
 *                 required:
 *                   - id
 *                 properties:
 *                   id:
 *                     type: string
 *                     format: uuid
 *               service:
 *                 type: object
 *                 required:
 *                   - id
 *                 properties:
 *                   id:
 *                     type: string
 *                     format: uuid
 *     responses:
 *       200:
 *         description: Item créé avec succès.
 *       401:
 *         description: Non autorisé. L'utilisateur doit être authentifié
 *       409:
 *         description: Item déjà existant.
 *       500:
 *         description: Erreur interne du serveur.
 */
router.post('/',isAuth,createItem);

/**
 * @swagger
 * /items/{page}:
 *   get:
 *     summary: Récupère une liste d'items en fonction des filtres et des paramètres de pagination.
 *     tags: [Items]
 *     description: Récupère une liste d'items en fonction des filtres et des paramètres de pagination.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: page
 *         required: true
 *         schema:
 *           type: integer
 *         description: Numéro de la page à récupérer.
 *       - in: query
 *         name: year
 *         required: true
 *         schema:
 *           type: integer
 *         description: Année sur laquelle filtrer les items.
 *       - in: query
 *         name: id
 *         schema:
 *           type: string
 *         description: Matricule du professeur sur lequel filtrer les items.
 *       - in: query
 *         name: firstName
 *         schema:
 *           type: string
 *         description: Le prénom du professeur sur lequel filtrer les items.
 *       - in: query
 *         name: lastName
 *         schema:
 *           type: string
 *         description: Le nom du professeur sur lequel filtrer les items.
 *       - in: query
 *         name: givenId
 *         schema:
 *           type: string
 *         description: L'identifiant du cours sur lequel filtrer les items.
 *       - in: query
 *         name: nameLesson
 *         schema:
 *           type: string
 *         description: Le nom de la matière sur laquelle filtrer les items.
 *     responses:
 *       200:
 *         description: Liste des items récupérée avec succès.
 *       500:
 *         description: Internal server error
 */
router.get('/:page',isAuth,getItemFilterPage);

/**
 * @swagger
 * /items/{id}:
 *   delete:
 *     summary: Supprime un item par son id.
 *     tags: [Items]
 *     description: Supprime un item par son id.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           format: uuid
 *         required: true
 *         description: Id de l'item à supprimer.
 *     responses:
 *       200:
 *         description: Item supprimé avec succès.
 *       401:
 *         description: Non autorisé. L'utilisateur doit être authentifié
 *       404:
 *         description: Item non trouvé.
 *       500:
 *         description: Erreur interne du serveur.
 */
router.delete('/:id',isAuth,deleteItemById);

/**
 * @swagger
 * /items:
 *   put:
 *     summary: Met à jour un item.
 *     tags: [Items]
 *     description: Met à jour un item.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - types
 *               - lesson
 *               - service
 *             properties:
 *               types:
 *                 type: array
 *                 items:
 *                   type: object
 *                   required:
 *                     - name
 *                     - amountHours
 *                   properties:
 *                     name:
 *                       type: string
 *                     amountHours:
 *                       type: number
 *               lesson:
 *                 type: object
 *                 required:
 *                   - id
 *                 properties:
 *                   id:
 *                     type: string
 *                     format: uuid
 *               service:
 *                 type: object
 *                 required:
 *                   - id
 *                 properties:
 *                   id:
 *                     type: string
 *                     format: uuid
 *           example:
 *             types: [ { name: 'TP', amountHours: 9 }, { name: 'CM', amountHours: 12 } ]
 *             id: '824ebe99-31f1-4efd-9185-f1a5eed80723'
 *     responses:
 *       200:
 *         description: Item mis à jour avec succès.
 *       401:
 *         description: Non autorisé. L'utilisateur doit être authentifié
 *       404:
 *         description: Item non trouvé.
 *       500:
 *         description: Erreur interne du serveur.
 */
router.put('/',isAuth,updateItem);

/**
 * @swagger
 * /items/item/{id}:
 *   get:
 *     summary: Récupère un item par son id.
 *     tags: [Items]
 *     description: Récupère un item par son id.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           format: uuid
 *         required: true
 *         description: Id de l'item à récupérer.
 *     responses:
 *       200:
 *         description: Item récupéré avec succès.
 *       401:
 *         description: Non autorisé. L'utilisateur doit être authentifié
 *       404:
 *         description: Item non trouvé.
 *       500:
 *         description: Erreur interne du serveur.
 */
router.get('/item/:id',isAuth,getItemById);

/**
 * @swagger
 * /items/item/types/{id}:
 *   delete:
 *     summary: Supprime un type de cours d'un item.
 *     tags: [Items]
 *     description: Supprime un type de cours d'un item.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           format: uuid
 *         required: true
 *         description: Id du type de cours à supprimer.
 *     responses:
 *       204:
 *         description: Type de cours supprimé avec succès.
 *       401:
 *         description: Non autorisé. L'utilisateur doit être authentifié
 *       404:
 *         description: Type de cours non trouvé.
 *       500:
 *         description: Erreur interne du serveur.
 */
router.delete('/item/types/:id',isAuth,deleteTypeFromItem);

export default router;
