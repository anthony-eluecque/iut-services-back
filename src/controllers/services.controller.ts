import { Request, Response } from 'express';
import { Service, Teacher, Item } from '../entities';
import { AppDataStore } from '../config';
import Res from '../helpers/res.helper';
import { getAll } from './abstract.controller';
import messages from '../docs/messages.json';
import { In } from 'typeorm';

const { gotOne, created, updated, deleted, notFound,gotAll } = messages.services;
const options = { relations: ['items', 'teacher','items.lesson'] };


export const getServices = async (req: Request, res: Response) => getAll(req, res, AppDataStore.getRepository(Service), options.relations)
    
/**
 * Récupère tous les services triés par ordre croissant des identifiants des cours associés.
 *
 * @param {Request} req - L'objet de requête Express.
 * @param {Response} res - L'objet de réponse Express.
 * @returns {Promise<Response>} Une promesse résolue avec la réponse indiquant la réussite de la récupération des services triés ou un message d'erreur en cas d'échec.
 */
export const getServicesAscending = async (req: Request, res: Response) => {
    try {

        const servicesRepository = AppDataStore.getRepository(Service);
        const relations = [...options.relations, 'items.lesson','items.lessonTypes','items.lessonTypes.lessonType'];

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

/**
 * Récupère un service en fonction de son identifiant avec les relations associées.
 *
 * @param {Request} req - L'objet de requête Express.
 * @param {Response} res - L'objet de réponse Express.
 * @returns {Promise<Response>} Une promesse résolue avec la réponse indiquant la réussite de la récupération du service ou un message d'erreur en cas d'échec.
 */
export const getServiceById = async (req: Request, res: Response) => {
    try {
        const relations = [...options.relations,'items', 'items.lesson','items.lessonTypes','items.lessonTypes.lessonType'];
        const servicesRepository = AppDataStore.getRepository(Service);
        const id = req.params.id;
        const service = await servicesRepository.findOne({ where: { id }, relations: relations});
        if (!service) return Res.send(res, 404, notFound);
        return Res.send(res, 200, gotOne, service);
    } catch (error) {
        return Res.send(res, 500, messages.defaults.serverError, error);
    }
};


/**
 * Crée un nouveau service en fonction des données fournies dans la requête.
 *
 * @param {Request} req - L'objet de requête Express.
 * @param {Response} res - L'objet de réponse Express.
 * @returns {Promise<Response>} Une promesse résolue avec la réponse indiquant la réussite de la création du service ou un message d'erreur en cas d'échec.
 */
export const createService = async (req: Request, res: Response) => {
    try {
        const servicesRepository = AppDataStore.getRepository(Service);
        const teachersRepository = AppDataStore.getRepository(Teacher);
        const itemsRepository = AppDataStore.getRepository(Item);
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

/**
 * Met à jour un service existant en fonction des données fournies dans la requête.
 *
 * @param {Request} req - L'objet de requête Express.
 * @param {Response} res - L'objet de réponse Express.
 * @returns {Promise<Response>} Une promesse résolue avec la réponse indiquant la réussite de la mise à jour du service ou un message d'erreur en cas d'échec.
 */
export const updateService = async (req: Request, res: Response) => {
    try {
        const servicesRepository = AppDataStore.getRepository(Service);
        const id = req.body.id;
        const service = await servicesRepository.findOne({ where: { id }, relations: options.relations });
        if (!service) return Res.send(res, 404, notFound);
        await servicesRepository.merge(service, req.body).save();
        return Res.send(res, 200, updated, service);
    } catch (error) {
        return Res.send(res, 500, messages.defaults.serverError, error);
    }
};

/**
 * Supprime un service en fonction de son identifiant.
 *
 * @param {Request} req - L'objet de requête Express.
 * @param {Response} res - L'objet de réponse Express.
 * @returns {Promise<Response>} Une promesse résolue avec la réponse indiquant la réussite de la suppression du service ou un message d'erreur en cas d'échec.
 */
export const deleteServiceById = async (req: Request, res: Response) => {
    try {
        const servicesRepository = AppDataStore.getRepository(Service);
        const id = req.params.id;
        const service = await servicesRepository.findOne({ where: { id }, relations: options.relations });
        if (!service) return Res.send(res, 404, notFound);
        await servicesRepository.delete(service.id);
        return Res.send(res, 200, deleted);
    } catch (error) {
        return Res.send(res, 500, messages.defaults.serverError, error);
    }
};

/**
 * Récupère un service pour un enseignant spécifié dans une année donnée.
 *
 * @param {Request} req - L'objet de requête Express.
 * @param {Response} res - L'objet de réponse Express.
 * @returns {Promise<Response>} Une promesse résolue avec la réponse indiquant la réussite de la récupération du service ou un message d'erreur en cas d'échec.
 */
export const getServiceForTeacherInYear = async (req: Request, res: Response) => {
    try {
        const servicesRepository = AppDataStore.getRepository(Service);
        const teachersRepository = AppDataStore.getRepository(Teacher);

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