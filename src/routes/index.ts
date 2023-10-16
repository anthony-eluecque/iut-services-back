import express,{ Router } from "express";
const auth = require('../middlewares/auth');

// import useServiceRouter from "./services.routes";
// import useTeacherRouter from "./teachers.routes";
import useUsersRouter from "./user.router";
import useItemsRouter from './items.router';
import useRolesRouter from './roles.router';
import useTeachersRouter from './teachers.router';
import useLessonsRouter from './lessons.router';
import useServicesRouter from './services.router';
import authRouter from "./auth.router";
const router = Router();

router.use(express.urlencoded({ extended: false }));
// router.use('/services',useServiceRouter);
// router.use('/teachers',useTeacherRouter);
router.use('/token', authRouter);
router.use('/users', useUsersRouter);
router.use('/items',auth,useItemsRouter);
router.use('/teachers',auth,useTeachersRouter);
router.use('/roles',auth,useRolesRouter);
router.use('/lessons',auth,useLessonsRouter);
router.use('/services',auth,useServicesRouter);

export default router;