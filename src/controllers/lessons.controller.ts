import { Response, Request } from 'express';
import { getAll } from './abstract.controller';
import { Lesson } from '../models';

export const getAllLessons = async (req : Request, res : Response) => getAll(req,res,Lesson)

export const createLesson = async (req : Request, res : Response) => {
    try {
        
    } catch (error) {
        
    }
}