import express, { Router } from "express";
import { getServices, getServiceById, createService, updateService, deleteServiceById, getServiceForTeacherInYear } from "../controllers";

const router = Router();

router.use(express.urlencoded({ extended: false }));
router.get('/', getServices);
router.get('/:id', getServiceById);
router.post('/', createService);
router.put('/', updateService);
router.delete('/:id', deleteServiceById);
router.get('/teacher/:teacherId/year/:year', getServiceForTeacherInYear);

export default router;