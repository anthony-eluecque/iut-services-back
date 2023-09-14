import { Request, Response } from 'express';
import { Item, Lesson } from '../entities';
import { AppDataSource } from '../config/data-source';
import Res from '../helpers/res.helper';
import { getAll } from './abstract.controller';
import messages from '../docs/messages.json';

const { gotAll, gotOne, created, updated, deleted, notFound  } = messages.items

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
            take: pageCount,
            relations: options.relations
        });
        return Res.send(res,200,gotAll,items);
    } catch (error) {
        return Res.send(res,500,messages.defaults.serverError);
    }    
}

export const createItem = async (req: Request, res: Response) => {
    try {
        if (!req.body.lesson)
            return Res.send(res,400,'Bad Request')

        const lessonId = req.body.lesson;
        let lesson = await lessonsRepository.findOne({
            where: {
                id: lessonId,
            }});       
        
        if (!lesson){
            return Res.send(res,404,messages.lessons.notFound)
        } 
        const newItem = new Item();  
        // lesson.items.push(newItem);
        await itemsRepository.merge(newItem,req.body).save();
        return Res.send(res,200,created,newItem);

    } catch (error) {
        return Res.send(res,500,messages.defaults.serverError,error);
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
            return Res.send(res,404,notFound);
        }

        Object.assign(itemToUpdate,req.body);
        await itemsRepository.save(itemToUpdate);

        return Res.send(res,200,updated,itemToUpdate)

    } catch (error) {
        return Res.send(res,500,messages.defaults.serverError,error);  
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
            return Res.send(res,404,notFound);
        }

        Object.assign(itemToDelete,req.body);
        await itemsRepository.remove(itemToDelete);

        return Res.send(res,200,deleted,itemToDelete)

    } catch (error) {
        return Res.send(res,500,messages.defaults.serverError,error); 
    }    
}


