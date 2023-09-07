import express,{ Router } from "express";
import { Service } from "../models";

const router = Router();


router.use(express.urlencoded({ extended: false }));
router.get('/', async (req,res) => {res.status(200).json(await Service.find({}));} ); // to do

export default router;