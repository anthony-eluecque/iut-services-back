import express, { Router } from "express";
import { getServices, getServiceById, createService } from "../controllers";

const router = Router();

router.use(express.urlencoded({ extended: false }));
router.get('/', getServices);
router.get('/:id', getServiceById);
router.post('/', createService);

export default router;