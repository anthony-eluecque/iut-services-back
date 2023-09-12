import { Request, Response } from 'express';
import { User } from '../entities';
import { AppDataSource } from '../config/data-source';
import Res from '../helpers/res.helper';
import { Item } from '../entities/item.entity';
import { Lesson } from '../entities/lesson.entity';

const itemsRepository = AppDataSource.getRepository(Item);
const relations = { relations: ["lesson"]};
const lessonsRepository = AppDataSource.getRepository(Lesson);

export const getItems = async (req : Request, res : Response) => {
    try {
        const items = await itemsRepository.find(relations);
        return Res.send(res,200,'Success',items);
    } catch (error) {
        return Res.send(res,500,'Internal Server error');
    }
}

export const createItem = async (req: Request, res: Response) => {
    try {
        const lessonId = req.body.lessonId;
        let lesson = await lessonsRepository.findOne({
            where: {
                id: lessonId,
            }});       
        
        if (!lesson){
            return Res.send(res, 404, 'Lesson not found');
        } 
        const newItem = new Item();        
        newItem.amountHours = req.body.amountHours;
        newItem.type = req.body.type;
        newItem.lesson = lesson;

        lesson.items.push(newItem);

        await lessonsRepository.save(lesson);
        await itemsRepository.save(newItem);
        return Res.send(res,200,'',newItem);
    } catch (error) {
        return Res.send(res,500,'Internal Server error',error);
    }
}