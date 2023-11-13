import express, { Router } from "express";
import { getServices, getServiceById, createService, updateService, deleteServiceById, getServiceForTeacherInYear, getServicesAscending} from "../controllers";
import { isAuth } from "../middlewares/auth.middleware";
import { isAdmin } from "../middlewares/admin.middleware";

/**
 * @swagger
 * tags:
 *   name: Services
 *   description: Opérations sur les services de l'application
 */
const router = Router();

router.use(express.urlencoded({ extended: false }));

/**
 * @swagger
 * /services:
 *   get:
 *     summary: Récupère la liste de tous les services.
 *     tags: [Services]
 *     description: Récupère une liste de tous les services enregistrés.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Liste des services récupérée avec succès.
 *       401:
 *         description: Non autorisé. L'utilisateur doit être authentifié
 *       403:
 *         description: L'utilisateur doit avoir des privilèges d'administrateur.
 *       500:
 *         description: Erreur interne du serveur.
 */
router.get('/',isAuth,isAdmin,getServices);

/**
 * @swagger
 * /services/{id}:
 *   get:
 *     summary: Récupère un service par son id.
 *     tags: [Services]
 *     description: Récupère un service par son id.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           format: uuid
 *         required: true
 *         description: Id du service à récupérer.
 *     responses:
 *       200:
 *         description: Service récupéré avec succès.
 *       401:
 *         description: Non autorisé. L'utilisateur doit être authentifié
 *       404:
 *         description: Service non trouvé.
 *       500:
 *         description: Erreur interne du serveur.
 */
router.get('/:id',isAuth,getServiceById);

/**
 * @swagger
 * /services:
 *   post:
 *     summary: Crée un nouveau service.
 *     tags: [Services]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: Objet de requête pour créer un nouveau service.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               year:
 *                 type: integer
 *               itemsIds:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: uuid
 *               teacher:
 *                 type: string
 *                 format: uuid
 *             example:
 *               year: 2024
 *               itemsIds: ["56701031-3817-4504-a104-602642b48dc3"]
 *               teacher: 450de262-3183-4315-99be-2d9a914e8cf8
 *     responses:
 *       200:
 *         description: Service créé avec succès.
 *       401:
 *         description: Non autorisé. L'utilisateur doit être authentifié
 *       403:
 *         description: L'utilisateur doit avoir des privilèges d'administrateur.
 *       500:
 *         description: Erreur interne du serveur.
 */
router.post('/',isAuth,createService);

/**
 * @swagger
 * /services:
 *   put:
 *     summary: Met à jour un service.
 *     tags: [Services]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: Objet de requête pour mettre à jour un service.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 format: uuid
 *               year:
 *                 type: integer
 *               itemsIds:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: uuid
 *               teacher:
 *                 type: string
 *                 format: uuid
 *             example:
 *               id: 0596ff7a-076d-47fb-9dab-1b672254e46c
 *               itemsIds: []
 *     responses:
 *       200:
 *         description: Service mis à jour avec succès.
 *       401:
 *         description: Non autorisé. L'utilisateur doit être authentifié
 *       403:
 *         description: L'utilisateur doit avoir des privilèges d'administrateur.
 *       404:
 *         description: Service non trouvé.
 *       500:
 *         description: Erreur interne du serveur.
 */
router.put('/',isAuth,updateService);

/**
 * @swagger
 * /services/{id}:
 *   delete:
 *     summary: Supprime un service.
 *     tags: [Services]
 *     description: Supprime un service.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           format: uuid
 *         required: true
 *         description: Id du service à supprimer.
 *     responses:
 *       200:
 *         description: Service supprimé avec succès.
 *       401:
 *         description: Non autorisé. L'utilisateur doit être authentifié
 *       403:
 *         description: L'utilisateur doit avoir des privilèges d'administrateur.
 *       404:
 *         description: Service non trouvé.
 *       500:
 *         description: Erreur interne du serveur.
 */
router.delete('/:id',isAuth,deleteServiceById);

/**
 * @swagger
 * /services/teacher/{teacherId}/year/{year}:
 *   get:
 *     summary: Récupère un service pour un enseignant et une année donnée.
 *     tags: [Services]
 *     description: Récupère un service pour un enseignant et une année donnée.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: teacherId
 *         schema:
 *           type: string
 *           format: uuid
 *         required: true
 *         description: Id de l'enseignant.
 *       - in: path
 *         name: year
 *         schema:
 *           type: integer
 *         required: true
 *         description: Année du service.
 *     responses:
 *       200:
 *         description: Service récupéré avec succès.
 *       401:
 *         description: Non autorisé. L'utilisateur doit être authentifié
 *       404:
 *         description: Service non trouvé.
 *       500:
 *         description: Erreur interne du serveur.
 */
router.get('/teacher/:teacherId/year/:year',isAuth,getServiceForTeacherInYear);

/**
 * @swagger
 * /services/{id}/ascending:
 *   get:
 *     summary: Récupère la liste des services triée par ordre croissant.
 *     tags: [Services]
 *     description: Récupère la liste des services en triant par ordre croissant les cours y appartenant.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           format: uuid
 *         required: true
 *         description: Id du service à récupérer.
 *     responses:
 *       200:
 *         description: Service récupéré avec succès.
 *       401:
 *         description: Non autorisé. L'utilisateur doit être authentifié
 *       404:
 *         description: Service non trouvé.
 *       500:
 *         description: Erreur interne du serveur.
 */
router.get('/:id/ascending',getServicesAscending);

export default router;