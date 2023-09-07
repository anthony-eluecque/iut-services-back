import { Response, Request } from 'express';
import { Teacher } from '../models';

export const getTeachers = async (req : Request ,res : Response) => {
    
    try {
        res.status(200).json(await Teacher.find({})); 
    } catch (error) {
        console.log("Error (getTeachers) : ", error);
        res.status(500).json({error : "Error : getTeachers"});
    }
};

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