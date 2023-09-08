import express,{ Router , Request, Response} from "express";
import useServicesRouter from "./services.routes";
import useTeachersRouter from "./teachers.routes";
import useLessonsRouter from './lessons.routes'

const router = Router();

router.get('/',(req : Request , res : Response) => {
    res.status(200).send("Hello world !")
})

router.use(express.urlencoded({ extended: false }));
router.use('/services',useServicesRouter);
router.use('/teachers',useTeachersRouter);
router.use('/lessons',useLessonsRouter);

export default router;