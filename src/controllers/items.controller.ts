import { Request, Response } from 'express';
import { Item, Lesson } from '../entities';
import { AppDataSource } from '../config/data-source';
import Res from '../helpers/res.helper';
import { getAll } from './abstract.controller';
import messages from '../docs/messages.json';
import { FindOptionsWhere } from 'typeorm/find-options/FindOptionsWhere';
import { ILike } from 'typeorm';

const { gotAll, created, updated, deleted, notFound  } = messages.items;
const options = { relations: ["lesson", "service"] };

const itemsRepository = AppDataSource.getRepository(Item);
const lessonsRepository = AppDataSource.getRepository(Lesson);

export const getItems = (req : Request, res : Response) => getAll(req,res,itemsRepository,options.relations);

export const getItemFilterPage = async (req : Request, res : Response) => {
    try {
        const year = parseInt(req.query.year as string)
        const page = parseInt(req.params.page) || 1;
        
        const pageCount = 5;
        const skip = (page - 1) * pageCount;
        
        const { id, firstName, lastName, givenId, nameLesson } = req.query

        let where: FindOptionsWhere<any> = 
               {
                        service: {
                        year: req.query.year,
                            teacher: {
                                givenId: id != '' && id 
                                    ? ILike('%' + id + '%') 
                                    : null,
                                firstName: firstName != '' && firstName 
                                    ? ILike('%' + firstName + '%') 
                                    : null,
                                lastName: lastName != '' && lastName 
                                    ? ILike('%' + lastName + '%') : null
                            }
                    },
                    lesson: {
                        givenId: givenId != '' && givenId 
                            ?  ILike('%' + givenId + '%') 
                            : null,
                        name: nameLesson != '' && nameLesson 
                            ? ILike('%' + nameLesson + '%') 
                            : null,
                    }
                };

                

        const itemsCount = await itemsRepository.findAndCount({
            skip,
            take: pageCount,
            relations: [...options.relations, "service.teacher"],
            where
        });

        return Res.send(res,200,gotAll, {items: itemsCount[0], count: itemsCount[1]});
    } catch (error) {
    }    
};

export const createItem = async (req: Request, res: Response) => {
    try {
        if (!req.body.lesson)
            return Res.send(res,400,'Bad Request');

        const lessonId = req.body.lesson;
        const lesson = await lessonsRepository.findOne({
            where: {
                id: lessonId,
            }});       
        
        if (!lesson){
            return Res.send(res,404,messages.lessons.notFound);
        } 
        const newItem = new Item();  
        await itemsRepository.merge(newItem,req.body).save();
        return Res.send(res,200,created,newItem);

    } catch (error) {
        return Res.send(res,500,messages.defaults.serverError,error);
    }
};

export const updateItem = async (req: Request, res: Response) => {
    try {
        const itemId = req.body.id;

        const itemToUpdate = await itemsRepository.findOne({
            where: {
                id: itemId,
            }});
        
        if (!itemToUpdate){
            return Res.send(res,404,notFound);
        }

        await itemsRepository.merge(itemToUpdate,req.body).save();
        return Res.send(res,200,updated,itemToUpdate);

    } catch (error) {
        return Res.send(res,500,messages.defaults.serverError,error);  
    }
};

export const deleteItemById = async (req: Request, res: Response) => {
    try {

        const itemId = req.params.id;

        const itemToDelete = await itemsRepository.findOne({
            where: {
                id: itemId,
            }});
        
        if (!itemToDelete)
            return Res.send(res,404,notFound);
        

        await itemsRepository.delete(itemToDelete.id);

        return Res.send(res,200,deleted);

    } catch (error) {
        return Res.send(res,500,messages.defaults.serverError,error); 
    }    
};


