import { Request, Response } from 'express';
import { Item, Lesson, Service, Teacher } from '../entities';
import { AppDataStore } from '../config';
import Res from '../helpers/res.helper';
import { getAll } from './abstract.controller';
import messages from '../docs/messages.json';
import { FindOptionsWhere } from 'typeorm/find-options/FindOptionsWhere';
import { ILike, In } from 'typeorm';
import { Lesson_type } from '../entities/lesson_type.entity';
import { CustomJoinItemsLessons } from '../entities/joinItemsLessons';


const { gotAll, created, updated, deleted, notFound  } = messages.items;
const options = { relations: ["lesson", "service"] };

export const getItems = (req : Request, res : Response) => getAll(req,res,AppDataStore.getRepository(Item),options.relations);

export const getItemFilterPage = async (req : Request, res : Response) => {
    try {
        const itemsRepository = AppDataStore.getRepository(Item);

        const year = parseInt(req.query.year as string)
        const page = parseInt(req.params.page) || 1;
        
        const pageCount = 5;
        const skip = (page - 1) * pageCount;
        
        const { id, firstName, lastName, givenId, nameLesson } = req.query

        let where: FindOptionsWhere<any> = {
            service: {
                year: year,
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
            relations: [...options.relations, "service.teacher",'lessonTypes','lessonTypes.lessonType'],
            where
        });

        return Res.send(res,200,gotAll, {items: itemsCount[0], count: itemsCount[1]});
    } catch (error) {
    }    
};

export const createItem = async (req: Request, res: Response) => {
    try {
        const lessonsRepository = AppDataStore.getRepository(Lesson);
        const itemsRepository = AppDataStore.getRepository(Item);
        const servicesRepository = AppDataStore.getRepository(Service);
        const teachersRepository = AppDataStore.getRepository(Teacher);
        
        let { service, lesson } = req.body;
        let { teacher } = service;

        const isExistingTeacher = await teachersRepository.findOne({where:{givenId:teacher.givenId}})
        if (!isExistingTeacher){
            // Le teacher n'existe pas
            teacher = teachersRepository.create({
                firstName: teacher.firstName,
                givenId: teacher.givenId,
                lastName: teacher.lastName,
            })
            await teachersRepository.save(teacher);
        } else { teacher = isExistingTeacher }

        const isExistingLesson = await lessonsRepository.findOne({where:{givenId: lesson.givenId}})
        if (!isExistingLesson){
            // La lesson n'existe pas
            lesson = lessonsRepository.create({
                givenId: lesson.givenId,
                name : lesson.name
            })
            await lessonsRepository.save(lesson)
        } else { lesson = isExistingLesson }

        const isExistingService = await servicesRepository.findOne({
            where: {
                teacher:{
                    givenId: teacher.givenId
                }
            }
        })
        if (!isExistingService){
            // Le service n'existe pas
            service = servicesRepository.create({
                year : 2023,
                teacher : teacher,
                items : []
            })
            await servicesRepository.save(service)
        } else { service = isExistingService }


        const newItem = itemsRepository.create({
            lesson : lesson,
            service : service,
            lessonTypes : [],
        })
        await itemsRepository.save(newItem)
        return Res.send(res,200,messages.items.created,newItem)
    } catch (error) {
        return Res.send(res,500,messages.defaults.serverError,error);
    }   
};

export const updateItem = async (req: Request, res: Response) => {
    try {
        const itemsRepository = AppDataStore.getRepository(Item);
        const lessonsTypesRepository = AppDataStore.getRepository(Lesson_type);
        const itemsLessonsJoin = AppDataStore.getRepository(CustomJoinItemsLessons)
        const lessonsRepository = AppDataStore.getRepository(Lesson);

        const { id, types, lesson, service } = req.body
        const names = types.map((type) => type.name) as Array<string>

        let lessonsTypes = await lessonsTypesRepository.find({
            where: {name : In(names)}
        })

        const oldItem = await itemsRepository.findOne({
            where: {
                id: id
            },
            relations: [...options.relations,"lessonTypes","lessonTypes.lessonType","service.teacher"]
        });
        
        if (!oldItem){
            return Res.send(res,404,notFound);
        }
        for (const lessonType of lessonsTypes) {
            const obj = types.find(obj => obj.name == lessonType.name)

            const isExistingJoin = await itemsLessonsJoin.findOne({
                where: {
                    item : {
                        id: oldItem.id
                    },
                    lessonType: {
                        name : lessonType.name
                    }
                }
            })
            if (isExistingJoin){
                isExistingJoin.amountHours = obj.amountHours
                await itemsLessonsJoin.save(isExistingJoin)
            } else {
                const newType = await itemsLessonsJoin.create({
                    amountHours: obj.amountHours,
                    item : oldItem,
                    lessonType: lessonType
                }) 
                await itemsLessonsJoin.insert(newType);
            }
        }

        // await itemsRepository.update({

        // },{
        //     lesson,
        //     service
        // })

        // oldItem.lesson = lesson
        // oldItem.service = service
        // await itemsRepository.save(oldItem)
        return Res.send(res,200,updated,oldItem);

    } catch (error) {
        console.error(error)
        return Res.send(res,500,messages.defaults.serverError,error);  
    }
};

export const deleteItemById = async (req: Request, res: Response) => {
    try {
        const lessonsRepository = AppDataStore.getRepository(Lesson);
        const itemsRepository = AppDataStore.getRepository(Item);

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


export const getItemById = async (req: Request, res: Response) => {
    try {
        const itemsRepository = AppDataStore.getRepository(Item)

        const { id } = req.query; 
        
        const isExistingItem = await itemsRepository.findOne({
            where: {
                id: id as string,
            },
            relations : [...options.relations,'service.teacher','lessonTypes','lessonTypes.lessonType']
        });

        if (!isExistingItem) return Res.send(res,404,notFound);
        return Res.send(res,200,messages.items.gotOne,isExistingItem);

    } catch (error) {
        
    }
}


