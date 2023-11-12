import { Router } from "express";
import { 
    getUsers, 
    getUserFilterPage,
    createUser, 
    authenticate , 
    login, 
    getUser, 
    logout, 
    deleteUser,
    updateUser,
    resetPassword,
    changePassword,
    deleteAccount,
    forgotPassword} from "../controllers";
import { isAuth } from "../middlewares/auth.middleware";
import { isAdmin } from "../middlewares/admin.middleware";

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Operations sur les utilisateurs de l'application
 */
const router = Router();

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Récupère la liste de tous les utilisateurs.
 *     tags: [Users]
 *     description: Récupère une liste de tous les utilisateurs enregistrés.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Liste des utilisateurs récupérée avec succès.
 *       401:
 *         description: Non autorisé. L'utilisateur doit être authentifié
 *       403:
 *         description: L'utilisateur doit avoir des privilèges d'administrateur.
 *       500:
 *         description: Erreur interne du serveur.
 */
router.get('/', isAuth, isAdmin, getUsers); 


/**
 * @swagger
 * /users/:
 *   post:
 *     summary: Crée un nouvel utilisateur.
 *     tags: [Users]
 *     requestBody:
 *       description: Objet de requête pour créer un nouvel utilisateur.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *             example:
 *               email: john.doe@example.com
 *               password: mypassword
 *               firstName: John
 *               lastName: Doe
 *     responses:
 *       200:
 *         description: L'utilisateur a été créé avec succès.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Requête incorrecte. Les champs requis sont manquants ou invalides.
 *       409:
 *         description: L'utilisateur existe déjà.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       500:
 *         description: Erreur interne du serveur.
 */
router.post('/', createUser);



/**
 * @swagger
 * /users/auth:
 *   get:
 *     summary: Récupération côté front de l'utilisateur.
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Authentification réussie.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       401:
 *         description: Non autorisé. L'utilisateur n'est pas authentifié.
 *       500:
 *         description: Erreur interne du serveur.
 */
router.get('/auth', isAuth, authenticate);


/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: Authentification de l'utilisateur.
 *     tags: [Users]
 *     requestBody:
 *       description: Objet de requête pour l'authentification de l'utilisateur.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             example:
 *               email: john.doe@example.com
 *               password: mypassword
 *     responses:
 *       204:
 *         description: Authentification réussie.
 *       400:
 *         description: Requête incorrecte. Les champs requis sont manquants ou invalides.
 *       401:
 *         description: L'utilisateur n'a pas été trouvé ou le mot de passe est incorrect.
 *       500:
 *         description: Erreur interne du serveur.
 */
router.post('/login', login);

/**
 * @swagger
 * /users/logout:
 *   post:
 *     summary: Déconnexion de l'utilisateur.
 *     tags: [Users]
 *     responses:
 *       204:
 *         description: L'utilisateur a été déconnecté avec succès.
 *       500:
 *         description: Erreur interne du serveur.
 */
router.post('/logout', logout);

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Récupère les informations d'un utilisateur spécifique.
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de l'utilisateur à récupérer.
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Informations de l'utilisateur récupérées avec succès.
 *       404:
 *         description: Utilisateur non trouvé.
 *       500:
 *         description: Erreur interne du serveur.
 */

router.post('/resetPassword', isAuth, resetPassword);
router.post('/changePassword', changePassword);
router.post('/forgotPassword', forgotPassword);
router.post('/deleteAccount', isAuth, deleteAccount);
router.get('/:id',isAuth,getUser);

/**
 * @swagger
 * /users:
 *   put:
 *     summary: Met à jour les informations de l'utilisateur (nom & prénom seulement).
 *     tags: [Users]
 *     requestBody:
 *       description: Objet de requête pour mettre à jour les informations de l'utilisateur.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: uuid
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *             example:
 *               id: "f0c455d1-298a-4af1-875a-b0780b0c6db2"
 *               firstName: "Nouveau Prénom"
 *               lastName: "Nouveau Nom de Famille"
 *     responses:
 *       204:
 *         description: Les informations de l'utilisateur ont été mises à jour avec succès.
 *       400:
 *         description: Mauvaise entrée. Le champ 'id' est manquant ou des erreurs de validation se sont produites.
 *       403:
 *         description: Non autorisé. Vous n'avez pas la permission de mettre à jour cet utilisateur.
 *       404:
 *         description: Utilisateur non trouvé.
 *       500:
 *         description: Erreur interne du serveur.
 */
router.put("/",isAuth, updateUser);

/**
 * @swagger
 * /users/filter/{page}:
 *  get:
 *    summary: Récupère la liste des utilisateurs filtrés avec pagination.
 *    tags: [Users]
 *    parameters:
 *      - in: path
 *        name: page
 *        required: true
 *        description: Numéro de la page à récupérer.
 *        schema:
 *          type: integer
 *    responses:
 *      200:
 *        description: Liste des utilisateurs récupérée avec succès.
 *      500:
 *        description: Erreur interne du serveur.
 */
router.get('/filter/:page', isAuth, isAdmin, getUserFilterPage);

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Supprime un utilisateur spécifique.
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de l'utilisateur à supprimer.
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: L'utilisateur a été supprimé avec succès.
 *       500:
 *         description: Erreur interne du serveur.
 */
router.delete('/:id',isAuth,deleteUser);

export default router;