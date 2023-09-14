import express, { Router } from "express";
import { getRoles, createRole, deleteRoleById } from "../controllers";

const router = Router();

router.use(express.urlencoded({ extended: false }));
router.get('/', getRoles);
router.post('/', createRole);
router.delete('/:id', deleteRoleById);

export default router;