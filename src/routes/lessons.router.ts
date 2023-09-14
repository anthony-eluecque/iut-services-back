import express,{ Router } from "express";
import { createLesson , getLessons, getLessonById} from "../controllers";

const router = Router();


router.use(express.urlencoded({ extended: false }));
router.get('/', getLessons); 
router.post('/',createLesson)
router.get('/:id',getLessonById)

export default router;