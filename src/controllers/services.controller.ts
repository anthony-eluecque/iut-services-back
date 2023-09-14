import { Request, Response } from 'express';
import { Service, Teacher, Item } from '../entities';
import { AppDataSource } from '../config/data-source';
import Res from '../helpers/res.helper';
import { getAll } from './abstract.controller';
import messages from '../docs/messages.json';
import { In } from 'typeorm';

const { gotOne, created, updated, deleted, notFound } = messages.teachers
const options = { relations: ['items'] };

const servicesRepository = AppDataSource.getRepository(Service);
const teachersRepository = AppDataSource.getRepository(Teacher);
const itemsRepository = AppDataSource.getRepository(Item);

export const getServices = (req: Request, res: Response) => getAll(req, res, servicesRepository, options.relations);

export const getServiceById = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const service = await servicesRepository.findOne({ where: { id } });
        if (!service) return Res.send(res, 404, notFound);
        return Res.send(res, 200, gotOne, service);
    } catch (error) {
        return Res.send(res, 500, messages.defaults.serverError, error);
    }
}

export const createService = async (req: Request, res: Response) => {
    try {
        const teacherId = req.body.teacherId;
        const teacher = await teachersRepository.findOne({ where: { id: teacherId } });
        if (!teacher) return Res.send(res, 404, "Teacher doesn't exist", teacherId);

        const ids = JSON.parse(req.body.itemsIds);
        const items = await itemsRepository.find({ where: { id: In(ids) } });
        if (!items) return Res.send(res, 404, "Items don't exist", items);

        const newService = new Service();
        newService.teacher = teacher;
        newService.items = items;
        newService.year = req.body.year;

        console.log(newService);
        
        await servicesRepository.save(newService);
        await teachersRepository.save(teacher);
        await itemsRepository.save(items);

        return Res.send(res, 200, created, newService);
    } catch (error) {
        console.warn(error)
        return Res.send(res, 500, messages.defaults.serverError, error);
    }
}