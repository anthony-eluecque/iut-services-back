import express,{ Router } from "express";
// import useServiceRouter from "./services.routes";
// import useTeacherRouter from "./teachers.routes";
import useUsersRouter from "./user.router";
import useItemsRouter from './items.router';
import useLessonsRouter from './lessons.router';
const router = Router();


router.use(express.urlencoded({ extended: false }));
// router.use('/services',useServiceRouter);
// router.use('/teachers',useTeacherRouter);
router.use('/users',useUsersRouter);
router.use('/items',useItemsRouter);
router.use('/lessons',useLessonsRouter);

export default router;