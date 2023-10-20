import express, { Router } from "express";
import { getServices, getServiceById, createService, updateService, deleteServiceById, getServiceForTeacherInYear, getServicesAscending} from "../controllers";
import { isAuth } from "../middlewares/auth.middleware";
import { isAdmin } from "../middlewares/admin.middleware";

const router = Router();

router.use(express.urlencoded({ extended: false }));
router.get('/',isAuth,isAdmin,getServices);
router.get('/:id',isAuth,getServiceById);
router.post('/',isAuth,createService);
router.put('/',isAuth,updateService);
router.delete('/:id',isAuth,deleteServiceById);
router.get('/teacher/:teacherId/year/:year',isAuth,getServiceForTeacherInYear);
router.get('/:id/ascending',getServicesAscending)

export default router;