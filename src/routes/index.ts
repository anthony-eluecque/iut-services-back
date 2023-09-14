import express,{ Router } from "express";
// import useServiceRouter from "./services.routes";
// import useTeacherRouter from "./teachers.routes";
import useUsersRouter from "./user.router";
import useItemsRouter from './items.router';
import useTeachersRouter from './teachers.router';
import useRolesRouter from './roles.router';

const router = Router();


router.use(express.urlencoded({ extended: false }));
// router.use('/services',useServiceRouter);
// router.use('/teachers',useTeacherRouter);
router.use('/users',useUsersRouter);
router.use('/items',useItemsRouter);
router.use('/teachers',useTeachersRouter);
router.use('/roles',useRolesRouter);

export default router;