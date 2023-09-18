import { Request, Response } from 'express';
import { Item, Lesson } from '../entities';
import { AppDataSource } from '../config/data-source';
import Res from '../helpers/res.helper';
import messages from '../docs/messages.json';
import { getAll } from './abstract.controller';

const { created, updated, gotOne, deleted, notFound } = messages.lessons;

const lessonsRepository = AppDataSource.getRepository(Lesson);
const itemsRepository = AppDataSource.getRepository(Item);
const options = {
    relations: ["items"]
};
export const getLessons = (req, res) => getAll(req, res, lessonsRepository, options.relations);

export const createLesson = async (req: Request, res: Response) => {
    try {
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

export const getLessonById = async (req: Request, res: Response) => {
    try {
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

export const updateLesson = async (req: Request, res: Response) => {
    try {
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

export const deleteLessonById = async (req: Request, res: Response) => {
    try {

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


export const getLessonByGivenId = async (req: Request, res: Response) => {
    try {
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