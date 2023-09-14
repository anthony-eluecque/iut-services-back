import express,{ Router } from "express";
import { createLesson , getLessons} from "../controllers";
// import { getUsers, createUser } from "../controllers";

const router = Router();


router.use(express.urlencoded({ extended: false }));
router.get('/', getLessons); 
router.post('/',createLesson)

export default router;