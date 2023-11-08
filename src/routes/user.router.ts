import { Router } from "express";
import { 
    getUsers, 
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

const router = Router();


router.get('/', isAuth, isAdmin, getUsers); 
router.post('/', createUser);

router.get('/auth', isAuth, authenticate);
router.post('/login', login);
router.post('/logout', logout);

router.post('/resetPassword', isAuth, resetPassword);
router.post('/changePassword', changePassword);
router.post('/forgotPassword', forgotPassword);
router.post('/deleteAccount', isAuth, deleteAccount);
router.get('/:id',isAuth,getUser);
router.put("/",isAuth, updateUser)
router.delete('/:id',isAuth,deleteUser);

export default router;