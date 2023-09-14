import express,{ Router } from "express";
import { createLesson , getLessons, getLessonById, deleteLessonById, updateLesson} from "../controllers";

const router = Router();


router.use(express.urlencoded({ extended: false }));
router.get('/', getLessons); 
router.post('/',createLesson)
router.get('/:id',getLessonById)
router.delete('/:id',deleteLessonById)
router.post('/',updateLesson)

export default router;