import express, { Router } from "express";
import { getServices, getServiceById, createService, updateService, deleteServiceById, getServiceForTeacherInYear, getServicesAscending} from "../controllers";

const router = Router();

router.use(express.urlencoded({ extended: false }));
router.get('/', getServices);
router.get('/:id', getServiceById);
router.post('/', createService);
router.put('/', updateService);
router.delete('/:id', deleteServiceById);
router.get('/teacher/:teacherId/year/:year', getServiceForTeacherInYear);
router.get('/:id/ascending',getServicesAscending)

export default router;