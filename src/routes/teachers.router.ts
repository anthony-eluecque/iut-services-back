import express, { Router } from "express";
import { getTeacherById, getTeachers, createTeacher, updateTeacher, deleteTeacherById } from "../controllers";

const router = Router();

router.use(express.urlencoded({ extended: false }));
router.get('/', getTeachers);
router.get('/:id', getTeacherById);
router.post('/', createTeacher);
router.put('/:id', updateTeacher);
router.delete('/:id', deleteTeacherById);

export default router;