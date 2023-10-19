import express, { Router } from "express";
import { getTeacherById, getTeachers, createTeacher, updateTeacher, deleteTeacherById } from "../controllers";
import { getTeacherByGivenId } from "../controllers/teachers.controller";
import { isAuth } from "../middlewares/auth.middleware";
import { isAdmin } from "../middlewares/admin.middleware";
const router = Router();

router.use(express.urlencoded({ extended: false }));
router.get('/',isAuth,isAdmin,getTeachers);
router.post('/',isAuth,createTeacher);
router.put('/',isAuth,updateTeacher);
router.get('/:id',isAuth,getTeacherById);
router.delete('/:id',isAuth,deleteTeacherById);
router.get('/givenid/:givenId',isAuth,getTeacherByGivenId);

export default router;