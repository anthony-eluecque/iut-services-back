import express,{ Router } from "express";
import { getAllLessons } from "../controllers";

const router = Router();


router.use(express.urlencoded({ extended: false }));
router.get('/',getAllLessons)
// router.get('/:page',);
// router.post('/',);
// router.delete('/',)

export default router;