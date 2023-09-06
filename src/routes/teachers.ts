import express,{ Router } from "express";
import { createTeacher, getTeachers } from "../controllers";

const router = Router();


router.use(express.urlencoded({ extended: false }));
router.get('/', getTeachers); 
router.post('/', createTeacher);

export default router;