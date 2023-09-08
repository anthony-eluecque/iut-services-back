import express,{ Router } from "express";
import { Service } from "../models";
import { createService, deleteService, getServices, getAllServices } from "../controllers";

const router = Router();


router.use(express.urlencoded({ extended: false }));
router.get('/',getAllServices)
router.get('/:page',getServices);
router.post('/',createService);
router.delete('/',deleteService)


export default router;