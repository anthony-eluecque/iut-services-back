import express,{ Router } from "express";
import useServiceRouter from "./services.routes";
import useTeacherRouter from "./teachers.routes";
import useItemsRouter from "./items.routes"

const router = Router();

router.use(express.urlencoded({ extended: false }));
router.use('/services',useServiceRouter);
router.use('/teachers',useTeacherRouter);
router.use('/items',useItemsRouter);

export default router;