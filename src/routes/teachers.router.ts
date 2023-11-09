import { Router } from "express";
import {
    getTeachers,
    getTeacherById,
    createTeacher,
    updateTeacher,
    deleteTeacherById,
    getTeacherByGivenId
} from "../controllers/teachers.controller";
import { isAuth } from "../middlewares/auth.middleware";

/**
 * @swagger
 * tags:
 *   name: Teachers
 *   description: Opérations relatives aux enseignants dans l'application
 */
const router = Router();

/**
 * @swagger
 * /teachers:
 *   get:
 *     summary: Récupère la liste de tous les enseignants.
 *     tags: [Teachers]
 *     description: Récupère une liste de tous les enseignants enregistrés.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Liste des enseignants récupérée avec succès.
 *       401:
 *         description: Non autorisé. L'utilisateur doit être authentifié.
 *       403:
 *         description: L'utilisateur doit avoir des privilèges administratifs.
 *       500:
 *         description: Erreur de serveur interne.
 */
router.get('/', isAuth, getTeachers);

/**
 * @swagger
 * /teachers/{id}:
 *   get:
 *     summary: Récupère un enseignant spécifique par son ID.
 *     tags: [Teachers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de l'enseignant à récupérer.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Informations de l'enseignant récupérées avec succès.
 *       404:
 *         description: Enseignant non trouvé.
 *       500:
 *         description: Erreur de serveur interne.
 */
router.get('/:id', isAuth, getTeacherById);

/**
 * @swagger
 * /teachers:
 *   post:
 *     summary: Crée un nouvel enseignant.
 *     tags: [Teachers]
 *     requestBody:
 *       description: Corps de la requête pour créer un nouvel enseignant.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               givenId:
 *                 type: string
 *               lastName:
 *                 type: string
 *               firstName:
 *                 type: string
 *             example:
 *               givenId: 123456
 *               lastName: Dupont
 *               firstName: Jean
 *     responses:
 *       201:
 *         description: Enseignant créé avec succès.
 *       400:
 *         description: Mauvaise requête. Les champs requis sont manquants ou invalides.
 *       409:
 *         description: Enseignant déjà existant.
 *       500:
 *         description: Erreur de serveur interne.
 */
router.post('/', isAuth, createTeacher);

/**
 * @swagger
 * /teachers:
 *   put:
 *     summary: Met à jour un enseignant existant.
 *     tags: [Teachers]
 *     requestBody:
 *       description: Corps de la requête pour mettre à jour un enseignant existant.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *               lastName:
 *                 type: string
 *               firstName:
 *                 type: string
 *             example:
 *               id: e8618c63-edcf-41eb-b422-8a800527039c
 *               lastName: Doe
 *               firstName: John
 *     responses:
 *       200:
 *         description: Enseignant mis à jour avec succès.
 *       400:
 *         description: Mauvaise requête. Les champs requis sont manquants ou invalides.
 *       404:
 *         description: Enseignant non trouvé.
 *       500:
 *         description: Erreur de serveur interne.
 */
router.put('/', isAuth, updateTeacher);

/**
 * @swagger
 * /teachers/{id}:
 *   delete:
 *     summary: Supprime un enseignant spécifique.
 *     tags: [Teachers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de l'enseignant à supprimer.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Enseignant supprimé avec succès.
 *       404:
 *         description: Enseignant non trouvé.
 *       500:
 *         description: Erreur de serveur interne.
 */
router.delete('/:id', isAuth, deleteTeacherById);

/**
 * @swagger
 * /teachers/givenid/{givenId}:
 *   get:
 *     summary: Récupère un enseignant par un ID donné.
 *     tags: [Teachers]
 *     parameters:
 *       - in: path
 *         name: givenId
 *         required: true
 *         description: ID donné de l'enseignant à récupérer.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Enseignant récupéré avec succès.
 *       404:
 *         description: Enseignant non trouvé.
 *       500:
 *         description: Erreur de serveur interne.
 */
router.get('/givenid/:givenId', isAuth, getTeacherByGivenId);

export default router;
