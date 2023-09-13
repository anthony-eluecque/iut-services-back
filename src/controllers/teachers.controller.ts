import { Request, Response } from 'express';
import { Teacher } from '../entities';
import { AppDataSource } from '../config/data-source';
import Res from '../helpers/res.helper';
import { getAll } from './abstract.controller';
import messages from '../docs/messages.json';

const { gotOne, created, updated, deleted, notFound } = messages.items

const teachersRepository = AppDataSource.getRepository(Teacher);

export const getTeachers = (req: Request, res: Response) => getAll(req, res, teachersRepository);

export const getTeacherById = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const teacher = await teachersRepository.findOne({ where: { id } });
        if (!teacher) { return Res.send(res, 404, notFound); }
        return Res.send(res, 200, gotOne, teacher);
    } catch (error) {
        return Res.send(res, 500, messages.defaults.serverError, error);
    }
}

export const createTeacher = async (req: Request, res: Response) => {
    try {
        const newTeacher = new Teacher();
        await teachersRepository.merge(newTeacher, req.body).save();
        return Res.send(res, 200, created, newTeacher);
    } catch (error) {
        return Res.send(res, 500, messages.defaults.serverError, error);
    }
}

export const updateTeacher = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const teacher = await teachersRepository.findOne({ where: { id } });
        if (!teacher) { return Res.send(res, 404, notFound); }
        await teachersRepository.merge(teacher, req.body).save();
        return Res.send(res, 200, updated, teacher);
    } catch (error) {
        return Res.send(res, 500, messages.defaults.serverError, error);
    }
}

export const deleteTeacherById = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const teacher = await teachersRepository.findOne({ where: { id } });
        if (!teacher) { return Res.send(res, 404, notFound); }
        await teachersRepository.delete(teacher.id);
        return Res.send(res, 200, deleted);
    } catch (error) {
        return Res.send(res, 500, messages.defaults.serverError, error);
    }
}