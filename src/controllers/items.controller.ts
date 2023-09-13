import { Request, Response } from 'express';
import { Item, Lesson } from '../entities';
import { AppDataSource } from '../config/data-source';
import Res from '../helpers/res.helper';
import { getAll } from './abstract.controller';

const itemsRepository = AppDataSource.getRepository(Item);
const options = { relations: ["lesson"]};
const lessonsRepository = AppDataSource.getRepository(Lesson);

export const getItems = (req : Request, res : Response) => getAll(req,res,itemsRepository,options.relations);

export const getPageItems = async (req : Request, res : Response) => {
    try {
        const page = parseInt(req.params.page) || 1;
        const pageCount = 5;
        const skip = (page - 1) * pageCount;

        const items = await itemsRepository.findAndCount({
            skip,
            take: pageCount
        });
        return Res.send(res,200,'',items);
    } catch (error) {
        return Res.send(res,500,'Internal Server Error');
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
            // Revoir avec le object.assign en dessous demain
            return Res.send(res, 404, 'Lesson not found');
        } 
        const newItem = new Item();  
        // A CHANGER
        Object.assign(newItem, req.body);

        lesson.items.push(newItem);

        await lessonsRepository.save(lesson);
        await itemsRepository.save(newItem);
        return Res.send(res,200,'',newItem);

    } catch (error) {
        return Res.send(res,500,'Internal Server error',error);
    }
}

export const updateItem = async (req: Request, res: Response) => {
    try {
        const itemId = req.body.id;

        let itemToUpdate = await itemsRepository.findOne({
            where: {
                id: itemId,
            }})
        
        if (!itemToUpdate){
            return Res.send(res,404,'Item not found');
        }

        Object.assign(itemToUpdate,req.body);
        await itemsRepository.save(itemToUpdate);

        return Res.send(res,200,'Item updated successfully',itemToUpdate)

    } catch (error) {
        return Res.send(res,500,'Internal Server error',error);  
    }
}

export const deleteItemById = async (req: Request, res: Response) => {
    try {

        const itemId = req.params.id;

        let itemToDelete = await itemsRepository.findOne({
            where: {
                id: itemId,
            }})
        
        if (!itemToDelete){
            return Res.send(res,404,'Item not found');
        }

        Object.assign(itemToDelete,req.body);
        await itemsRepository.remove(itemToDelete);

        return Res.send(res,200,'Item removed successfully',itemToDelete)

    } catch (error) {
        return Res.send(res,500,'Internal Server error',error); 
    }    
}


