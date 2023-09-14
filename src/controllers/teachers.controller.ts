import { Request, Response } from 'express';
import { Role, Teacher } from '../entities';
import { AppDataSource } from '../config/data-source';
import Res from '../helpers/res.helper';
import { getAll } from './abstract.controller';
import messages from '../docs/messages.json';

const { gotOne, created, updated, deleted, notFound } = messages.teachers
const options = { relations : ['role', 'services'] };

const teachersRepository = AppDataSource.getRepository(Teacher);
const rolesRepository = AppDataSource.getRepository(Role);

export const getTeachers = (req: Request, res: Response) => getAll(req, res, teachersRepository, options.relations);

export const getTeacherById = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const teacher = await teachersRepository.findOne({ where: { id } });
        if (!teacher) return Res.send(res, 404, notFound);
        return Res.send(res, 200, gotOne, teacher);
    } catch (error) {
        return Res.send(res, 500, messages.defaults.serverError, error);
    }
}

export const createTeacher = async (req: Request, res: Response) => {
    try {
        const roleName = req.body.roleName;
        const role = await rolesRepository.findOne({
            where : {
                name : roleName
            }
        })

        if (!role) return Res.send(res,404,"Role doesn't exist",roleName);

        const newTeacher = new Teacher();

        newTeacher.role = role;
        await teachersRepository.merge(newTeacher, req.body).save();
        await rolesRepository.save(role);

        return Res.send(res, 200, created, newTeacher);
    } catch (error) {
        console.warn(error)
        return Res.send(res, 500, messages.defaults.serverError, error);
    }
}

export const updateTeacher = async (req: Request, res: Response) => {
    try {
        const id = req.body.id;
        const teacher = await teachersRepository.findOne({ where: { id } });
        if (!teacher) return Res.send(res, 404, notFound); 
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
        if (!teacher) return Res.send(res, 404, notFound);
        await teachersRepository.delete(teacher.id);
        return Res.send(res, 200, deleted);
    } catch (error) {
        return Res.send(res, 500, messages.defaults.serverError, error);
    }
}