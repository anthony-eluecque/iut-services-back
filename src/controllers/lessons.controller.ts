import { Request, Response } from 'express';
import { Item, Lesson } from '../entities';
import { AppDataStore } from '../config';
import Res from '../helpers/res.helper';
import messages from '../docs/messages.json';
import { getAll } from './abstract.controller';

const { created, updated, gotOne, deleted, notFound } = messages.lessons;
const options = {
    relations: ["items","items.lessonTypes","items.lesson","items.lessonTypes.lessonType"]
};
export const getLessons = (req, res) => getAll(req, res, AppDataStore.getRepository(Lesson), options.relations);

/**
 * Crée une nouvelle leçon en fonction des données fournies dans la requête.
 *
 * @param {Request} req - L'objet de requête Express.
 * @param {Response} res - L'objet de réponse Express.
 * @returns {Promise<Response>} Une promesse résolue avec la réponse indiquant la réussite de la création de la leçon ou un message d'erreur en cas d'échec.
 */
export const createLesson = async (req: Request, res: Response) => {
    try {
        const lessonsRepository = AppDataStore.getRepository(Lesson);
        // Vérifier si le leçon existe sur son nom
        const lessonName = req.body.name;

        let lesson = await lessonsRepository.findOne({
            where: {
                name: lessonName,
            }
        });

        if (!lesson) {
            lesson = new Lesson();
            console.log(lesson);
            await lessonsRepository.merge(lesson, req.body).save();
            return Res.send(res, 200, created, lesson);

        }

        return Res.send(res, 409, "Lesson Already Exist", lesson);

    } catch (error) {
        console.warn(error);
        return Res.send(res, 500, messages.defaults.serverError);

    }
};

/**
 * Récupère une leçon en fonction de son identifiant avec les relations associées.
 *
 * @param {Request} req - L'objet de requête Express.
 * @param {Response} res - L'objet de réponse Express.
 * @returns {Promise<Response>} Une promesse résolue avec la réponse indiquant la réussite de la récupération de la leçon ou un message d'erreur en cas d'échec.
 */
export const getLessonById = async (req: Request, res: Response) => {
    try {
        const lessonsRepository = AppDataStore.getRepository(Lesson);

        const lessonId = req.params.id;

        const lessonToGet = await lessonsRepository.findOne({
            where: {
                id: lessonId,
            },
            relations: options.relations
        });


        if (!lessonToGet) {
            return Res.send(res, 404, notFound);
        }

        return Res.send(res, 200, gotOne, lessonToGet);


    } catch (error) {
        return Res.send(res, 500, messages.defaults.serverError);
    }
};

/**
 * Met à jour une leçon existante en fonction des données fournies dans la requête.
 *
 * @param {Request} req - L'objet de requête Express.
 * @param {Response} res - L'objet de réponse Express.
 * @returns {Promise<Response>} Une promesse résolue avec la réponse indiquant la réussite de la mise à jour de la leçon ou un message d'erreur en cas d'échec.
 */
export const updateLesson = async (req: Request, res: Response) => {
    try {
        const lessonsRepository = AppDataStore.getRepository(Lesson);

        const lessonId = req.body.id;

        const lessonToUpdate = await lessonsRepository.findOne({
            where: {
                id: lessonId,
            },
            relations: options.relations
        });

        if (!lessonToUpdate) {
            return Res.send(res, 404, notFound);
        }

        await lessonsRepository.merge(lessonToUpdate, req.body).save();
        return Res.send(res, 200, updated, lessonToUpdate);

    } catch (error) {
        return Res.send(res, 500, messages.defaults.serverError, error);
    }
};

/**
 * Supprime une leçon en fonction de son identifiant, supprimant également tous les articles associés.
 *
 * @param {Request} req - L'objet de requête Express.
 * @param {Response} res - L'objet de réponse Express.
 * @returns {Promise<Response>} Une promesse résolue avec la réponse indiquant la réussite de la suppression de la leçon ou un message d'erreur en cas d'échec.
 */
export const deleteLessonById = async (req: Request, res: Response) => {
    try {
        const itemsRepository = AppDataStore.getRepository(Item);
        const lessonsRepository = AppDataStore.getRepository(Lesson);

        const lessonId = req.params.id;

        const lessonToDelete = await lessonsRepository.findOne({
            where: {
                id: lessonId,
            },
            relations: options.relations
        });


        if (!lessonToDelete) {
            return Res.send(res, 404, notFound);
        }

        for (const item of lessonToDelete.items) {
            await itemsRepository.remove(item);
        }

        await lessonsRepository.merge(lessonToDelete, req.body).remove();
        return Res.send(res, 200, deleted, lessonToDelete);

    } catch (error) {
        return Res.send(res, 500, messages.defaults.serverError, error);
    }
};

/**
 * Récupère une leçon en fonction de son identifiant donné.
 *
 * @param {Request} req - L'objet de requête Express.
 * @param {Response} res - L'objet de réponse Express.
 * @returns {Promise<Response>} Une promesse résolue avec la réponse indiquant la réussite de la récupération de la leçon ou un message d'erreur en cas d'échec.
 */
export const getLessonByGivenId = async (req: Request, res: Response) => {
    try {
        const lessonsRepository = AppDataStore.getRepository(Lesson);
        
        const givenId = req.params.givenId;
        const lesson = await lessonsRepository.findOne(
            { where: { givenId : givenId}}
        );
        if (!lesson) return Res.send(res, 404, notFound);
        return Res.send(res, 200, gotOne, lesson);
    } catch (error) {
        return Res.send(res, 500, messages.defaults.serverError, error);
    }
};