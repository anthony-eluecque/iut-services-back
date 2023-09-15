import express, { Router } from "express";
import { getServices, getServiceById, createService, updateService, deleteServiceById } from "../controllers";

const router = Router();

router.use(express.urlencoded({ extended: false }));
router.get('/', getServices);
router.get('/:id', getServiceById);
router.post('/', createService);
router.put('/', updateService);
router.delete('/:id', deleteServiceById);

export default router;