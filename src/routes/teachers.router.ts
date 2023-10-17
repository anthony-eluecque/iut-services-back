import express, { Router } from "express";
import { getTeacherById, getTeachers, createTeacher, updateTeacher, deleteTeacherById } from "../controllers";
import { getTeacherByGivenId } from "../controllers/teachers.controller";

const router = Router();

router.use(express.urlencoded({ extended: false }));
router.get('/', getTeachers);
router.post('/', createTeacher);
router.put('/', updateTeacher);
router.get('/:id', getTeacherById);
router.delete('/:id', deleteTeacherById);
router.get('/givenid/:givenId',getTeacherByGivenId);

export default router;