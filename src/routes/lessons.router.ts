import express,{ Router } from "express";
import { createLesson , getLessons, getLessonById, deleteLessonById, updateLesson} from "../controllers";
import { getLessonByGivenId } from "../controllers/lessons.controller";
import { isAuth } from "../middlewares/auth.middleware";

const router = Router();


router.use(express.urlencoded({ extended: false }));
router.get('/',isAuth,getLessons); 
router.post('/',isAuth,createLesson);
router.get('/:id',isAuth,getLessonById);
router.delete('/:id',isAuth,deleteLessonById);
router.post('/',isAuth,updateLesson);
router.get('/givenid/:givenId',isAuth,getLessonByGivenId);

export default router;