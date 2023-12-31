import express,{ Router } from "express";
import useUsersRouter from "./user.router";
import useItemsRouter from './items.router';
// import useRolesRouter from './roles.router';
import useTeachersRouter from './teachers.router';
import useLessonsRouter from './lessons.router';
import useServicesRouter from './services.router';

const router = Router();
router.use(express.urlencoded({ extended: false }));
router.use('/users', useUsersRouter);
router.use('/items',useItemsRouter);
router.use('/teachers',useTeachersRouter);
// router.use('/roles',useRolesRouter);
router.use('/lessons',useLessonsRouter);
router.use('/services',useServicesRouter);

export default router;