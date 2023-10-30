import { Request, Response } from 'express';
import { Service, Teacher, Item } from '../entities';
import { AppDataStore } from '../config';
import Res from '../helpers/res.helper';
import { getAll } from './abstract.controller';
import messages from '../docs/messages.json';
import { In } from 'typeorm';

const { gotOne, created, updated, deleted, notFound,gotAll } = messages.services;
const options = { relations: ['items', 'teacher','items.lesson'] };

const servicesRepository = AppDataStore.getRepository(Service);
const teachersRepository = AppDataStore.getRepository(Teacher);
const itemsRepository = AppDataStore.getRepository(Item);

export const getServices = async (req: Request, res: Response) => getAll(req, res, servicesRepository, options.relations)
    
export const getServicesAscending = async (req: Request, res: Response) => {
    try {
        const relations = ['items', 'items.lesson'];

        const entities = await servicesRepository.find({
            relations,
            where : {
                id : req.params.id
            },
            order: {
                items: {
                    lesson: {
                        givenId : "ASC"
                    }
                }  
            }

        });

        return Res.send(res, 200, gotAll, entities);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Une erreur s\'est produite' });
    }

    
    }

export const getServiceById = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const service = await servicesRepository.findOne({ where: { id }, relations: options.relations });
        if (!service) return Res.send(res, 404, notFound);
        return Res.send(res, 200, gotOne, service);
    } catch (error) {
        return Res.send(res, 500, messages.defaults.serverError, error);
    }
};

export const createService = async (req: Request, res: Response) => {
    try {
        const teacherId = req.body.teacher;
        const teacher = await teachersRepository.findOne({ where: { id: teacherId } });
        if (!teacher) return Res.send(res, 404, "Teacher doesn't exist", teacherId);

        let ids = req.body.itemsIds
        // Decomment if you use insomnia 
        // ids = JSON.parse(req.body.itemsIds); 
        const items = await itemsRepository.find({ where: { id: In(ids) } });

        if (!items) return Res.send(res, 404, "Items don't exist", items);

        const newService = new Service();
        newService.items = items;
        newService.year = req.body.year;
        newService.teacher = teacher;

        await servicesRepository.save(newService);
        await itemsRepository.save(items);
        await teachersRepository.save(teacher);

        return Res.send(res, 200, created, newService);
    } catch (error) {
        console.warn(error);
        return Res.send(res, 500, messages.defaults.serverError, error);
    }
};

export const updateService = async (req: Request, res: Response) => {
    try {
        const id = req.body.id;
        const service = await servicesRepository.findOne({ where: { id }, relations: options.relations });
        if (!service) return Res.send(res, 404, notFound);
        await servicesRepository.merge(service, req.body).save();
        return Res.send(res, 200, updated, service);
    } catch (error) {
        return Res.send(res, 500, messages.defaults.serverError, error);
    }
};

export const deleteServiceById = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const service = await servicesRepository.findOne({ where: { id }, relations: options.relations });
        if (!service) return Res.send(res, 404, notFound);
        await servicesRepository.delete(service.id);
        return Res.send(res, 200, deleted);
    } catch (error) {
        return Res.send(res, 500, messages.defaults.serverError, error);
    }
};

export const getServiceForTeacherInYear = async (req: Request, res: Response) => {
    try {
        const teacherId = req.params.teacherId;
        const year = parseInt(req.params.year);

        const teacher = await teachersRepository.findOne({ where: { id: teacherId } });
        if (!teacher) return Res.send(res, 404, "Teacher doesn't exist", teacherId);
        const service = await servicesRepository.findOne({ where: { year: year, teacher: { id: teacherId }}, relations: options.relations });
        if (!service) return Res.send(res, 404, "Service not found for specified teacher and year");

        return Res.send(res, 200, "Found service for the specified teacher and year", service);
    } catch (error) {
        console.warn(error);
        return Res.send(res, 500, messages.defaults.serverError, error);
    }
}