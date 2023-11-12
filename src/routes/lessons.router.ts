import express,{ Router } from "express";
import { createLesson , getLessons, getLessonById, deleteLessonById, updateLesson} from "../controllers";
import { getLessonByGivenId } from "../controllers/lessons.controller";
import { isAuth } from "../middlewares/auth.middleware";

/**
 * @swagger
 * tags:
 *   name: Lessons
 *   description: Operations sur les cours
 */
const router = Router();

router.use(express.urlencoded({ extended: false }));

/**
 * @swagger
 * /lessons:
 *   get:
 *     summary: Récupère la liste de tous les cours.
 *     tags: [Lessons]
 *     description: Récupère une liste de tous les cours enregistrés.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Liste des cours récupérée avec succès.
 *       401:
 *         description: Non autorisé. L'utilisateur doit être authentifié
 *       500:
 *         description: Erreur interne du serveur.
 */
router.get('/',isAuth,getLessons); 

/**
 * @swagger
 * /lessons:
 *   post:
 *     summary: Crée un nouveau cours.
 *     tags: [Lessons]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: Objet de requête pour créer un nouveau cours.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Lesson'
 *     responses:
 *       200:
 *         description: Cours créé avec succès.
 *       401:
 *         description: Non autorisé. L'utilisateur doit être authentifié
 *       500:
 *         description: Erreur interne du serveur.
 */
router.post('/',isAuth,createLesson);

/**
 * @swagger
 * /lessons/{id}:
 *   get:
 *     summary: Récupère un cours par son id.
 *     tags: [Lessons]
 *     description: Récupère un cours par son id.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Id du cours à récupérer.
 *     responses:
 *       200:
 *         description: Cours récupéré avec succès.
 *       401:
 *         description: Non autorisé. L'utilisateur doit être authentifié
 *       404:
 *         description: Cours non trouvé.
 *       500:
 *         description: Erreur interne du serveur.
 */
router.get('/:id',isAuth,getLessonById);

/**
 * @swagger
 * /lessons/{id}:
 *   delete:
 *     summary: Supprime un cours par son id.
 *     tags: [Lessons]
 *     description: Supprime un cours par son id.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Id du cours à supprimer.
 *     responses:
 *       200:
 *         description: Cours supprimé avec succès.
 *       401:
 *         description: Non autorisé. L'utilisateur doit être authentifié
 *       404:
 *         description: Cours non trouvé.
 *       500:
 *         description: Erreur interne du serveur.
 */
router.delete('/:id',isAuth,deleteLessonById);

/**
 * @swagger
 * /lessons:
 *   put:
 *     summary: Met à jour un cours par son id.
 *     tags: [Lessons]
 *     description: Met à jour un cours par son id.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: Objet de requête pour mettre à jour un cours.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             id:
 *               type: string
 *               format: uuid
 *             givenId:
 *               type: string
 *             name:
 *               type: string
 *             example:
 *               id: 6c09568a-843e-494a-b19c-b0f5863c1681
 *               givenId: R5.08
 *               name: Anglais
 *     responses:
 *       200:
 *         description: Cours mis à jour avec succès.
 *       401:
 *         description: Non autorisé. L'utilisateur doit être authentifié
 *       404:
 *         description: Cours non trouvé.
 *       500:
 *         description: Erreur interne du serveur.
 */
router.put('/',isAuth,updateLesson);

/**
 * @swagger
 * /lessons/givenid/{givenId}:
 *   get:
 *     summary: Récupère un cours par son identifiant donné.
 *     tags: [Lessons]
 *     description: Récupère un cours par son identifiant donné.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: givenId
 *         schema:
 *           type: string
 *         required: true
 *         description: Identifiant du cours à récupérer.
 *     responses:
 *       200:
 *         description: Cours récupéré avec succès.
 *       401:
 *         description: Non autorisé. L'utilisateur doit être authentifié
 *       404:
 *         description: Cours non trouvé.
 *       500:
 *         description: Erreur interne du serveur.
 */
router.get('/givenid/:givenId',isAuth,getLessonByGivenId);

export default router;