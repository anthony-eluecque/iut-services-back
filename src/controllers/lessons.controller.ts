import { Request, Response } from 'express';
import { Lesson, User } from '../entities';
import { AppDataSource } from '../config/data-source';
import Res from '../helpers/res.helper';
import messages from '../docs/messages.json'
import { getAll } from './abstract.controller';

const { created, updated, gotAll, gotOne, deleted } = messages.lessons

const lessonsRepository = AppDataSource.getRepository(Lesson);
const options = {
    relations: ["items"]
}
export const getLessons = (req , res ) => getAll(req,res,lessonsRepository,options.relations)

export const createLesson = async (req: Request, res: Response) => {
    try {
        // Vérifier si le leçon existe sur son nom
        const lessonId = req.body.lessonId;
        let lesson = await lessonsRepository.findOne({
            where: {
                id: lessonId,
            }});       
               
        if (!lesson){
            lesson = new Lesson();
            console.log(lesson);
            await lessonsRepository.merge(lesson,req.body).save();
            return Res.send(res,200,created,lesson);
            
        } 

        return Res.send(res,409,"Lesson Already Exist",lesson)

       

        

    } catch (error) {
        console.warn(error)
        return Res.send(res,500,messages.defaults.serverError);
        
    }
}

// export const getLesson = async (req: Request, res: Response) => {
//     try {
//         // Vérifier si le leçon existe sur son nom
//         const lessons = await lessonsRepository.find()

//         return Res.send(res,200,gotAll,lessons);

        

//     } catch (error) {
//         return Res.send(res,500,messages.defaults.serverError);
//     }
// }
