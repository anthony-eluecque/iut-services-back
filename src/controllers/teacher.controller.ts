import { Response, Request } from 'express';
import { Teacher } from '../models';
import { getAll } from './abstract.controller';

export const getAllTeachers = async (req : Request ,res : Response) => getAll(req,res,Teacher)

export const createTeacher = async (req : Request, res : Response) => {

    try {
        const teacherData = req.body;
        const newTeacher = new Teacher(teacherData);
        await newTeacher.save();
        res.status(201).json(newTeacher);

    } catch (error) {
        console.log("Error (createTeacher) : ", error);
        res.status(500).json({error : "Error : createTeacher"});
    }
};