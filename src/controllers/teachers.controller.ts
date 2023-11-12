import { Request, Response } from 'express';
import { Teacher } from '../entities';
import { AppDataStore } from '../config';
import Res from '../helpers/res.helper';
import { getAll } from './abstract.controller';
import messages from '../docs/messages.json';
import { ILike } from 'typeorm';

const { gotOne, created, updated, deleted, notFound } = messages.teachers;
const options = { relations : ['services'] };

// const rolesRepository = AppDataSource.getRepository(Role);

export const getTeachers = (req: Request, res: Response) => getAll(req, res, AppDataStore.getRepository(Teacher), options.relations);

export const getTeacherById = async (req: Request, res: Response) => {
    try {
        const teachersRepository = AppDataStore.getRepository(Teacher);
        const id = req.params.id;
        const teacher = await teachersRepository.findOne({ where: { id } });
        if (!teacher) return Res.send(res, 404, notFound);
        return Res.send(res, 200, gotOne, teacher);
    } catch (error) {
        return Res.send(res, 500, messages.defaults.serverError, error);
    }
};

export const getFilteredTeachers = async (req: Request, res: Response) => {
    try {
        const teachersRepository = AppDataStore.getRepository(Teacher);
        const { givenId, lastName, firstName } = req.query;
        const where = {
            givenId: givenId != '' && givenId ? ILike('%' + givenId + '%') : null,
            lastName: lastName != '' && lastName ? ILike('%' + lastName + '%') : null,
            firstName: firstName != '' && firstName ? ILike('%' + firstName + '%') : null,
        };
        const teachers = await teachersRepository.find({
            where
        });
        return Res.send(res, 200, 'Success', teachers);
    } catch (error) {
        return Res.send(res, 500, 'Internal Server error');
    }

}

export const createTeacher = async (req: Request, res: Response) => {
    try {
        const teachersRepository = AppDataStore.getRepository(Teacher);
        const roleName = req.body.roleName;
        // const role = await rolesRepository.findOne({
        //     where : {
        //         name : roleName
        //     }
        // });

        // if (!role) return Res.send(res,404,"Role doesn't exist",roleName);

        const newTeacher = new Teacher();

        // newTeacher.role = role;
        await teachersRepository.merge(newTeacher, req.body).save();
        // await rolesRepository.save(role);

        return Res.send(res, 200, created, newTeacher);
    } catch (error) {
        return Res.send(res, 500, messages.defaults.serverError, error);
    }
};

export const getTeacherByGivenId = async (req: Request, res: Response) => {
    try {
        const teachersRepository = AppDataStore.getRepository(Teacher);
        const givenId = req.params.givenId;
        const teacher = await teachersRepository.findOne(
            { where: { givenId : givenId}, relations : options.relations}
        );
        if (!teacher) return Res.send(res, 404, notFound);
        return Res.send(res, 200, gotOne, teacher);
    } catch (error) {
        return Res.send(res, 500, messages.defaults.serverError, error);
    }
};

export const updateTeacher = async (req: Request, res: Response) => {
    try {
        const teachersRepository = AppDataStore.getRepository(Teacher);
        const id = req.body.id;
        const teacher = await teachersRepository.findOne({ where: { id } });
        if (!teacher) return Res.send(res, 404, notFound); 
        await teachersRepository.merge(teacher, req.body).save();
        return Res.send(res, 200, updated, teacher);
    } catch (error) {
        return Res.send(res, 500, messages.defaults.serverError, error);
    }
};

export const deleteTeacherById = async (req: Request, res: Response) => {
    try {
        const teachersRepository = AppDataStore.getRepository(Teacher);
        const id = req.params.id;
        const teacher = await teachersRepository.findOne({ where: { id } });
        if (!teacher) return Res.send(res, 404, notFound);
        await teachersRepository.delete(teacher.id);
        return Res.send(res, 200, deleted);
    } catch (error) {
        return Res.send(res, 500, messages.defaults.serverError, error);
    }
};