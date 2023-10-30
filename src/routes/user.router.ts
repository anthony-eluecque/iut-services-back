import { Router } from "express";
import { 
    getUsers, 
    createUser, 
    authenticate , 
    login, 
    getUser, 
    logout, 
    deleteUser,
    updateUser} from "../controllers";
import { isAuth } from "../middlewares/auth.middleware";
import { isAdmin } from "../middlewares/admin.middleware";

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Operations on users
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
 *         description: Non autorisé. L'utilisateur doit être authentifié et avoir des privilèges d'administrateur.
 *       500:
 *         description: Erreur interne du serveur.
 */
router.get('/', isAuth, isAdmin, getUsers); 
router.post('/', createUser);

router.get('/auth', isAuth, authenticate);
router.post('/login', login);
router.post('/logout', logout);

router.get('/:id',isAuth,getUser);
router.put("/",isAuth, updateUser)
router.delete('/:id',isAuth,deleteUser);

export default router;