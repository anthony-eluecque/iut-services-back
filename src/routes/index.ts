import express,{ Router , Request, Response} from "express";
import useServiceRouter from "./services.routes";
import useTeacherRouter from "./teachers.routes";

const router = Router();

router.get('/',(req : Request , res : Response) => {
    res.status(200).send("Hello world !")
})

router.use(express.urlencoded({ extended: false }));
router.use('/services',useServiceRouter);
router.use('/teachers',useTeacherRouter);

export default router;