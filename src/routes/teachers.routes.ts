import express,{ Router } from "express";
import { createTeacher, getAllTeachers } from "../controllers";

const router = Router();


router.use(express.urlencoded({ extended: false }));
router.get('/', getAllTeachers); 
router.post('/', createTeacher);

export default router;