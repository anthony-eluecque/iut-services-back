import { Request, Response } from 'express';
import { Teacher } from '../entities';
import { AppDataStore } from '../config';
import Res from '../helpers/res.helper';
import { getAll } from './abstract.controller';
import messages from '../docs/messages.json';
import { ILike } from 'typeorm';

const { gotOne, created, updated, deleted, notFound } = messages.teachers;
const options = { relations : ['services'] };

export const getTeachers = (req: Request, res: Response) => getAll(req, res, AppDataStore.getRepository(Teacher), options.relations);


/**
 * Récupère un enseignant en fonction de son identifiant.
 *
 * @param {Request} req - L'objet de requête Express.
 * @param {Response} res - L'objet de réponse Express.
 * @returns {Promise<Response>} Une promesse résolue avec la réponse contenant les informations de l'enseignant ou un message d'erreur.
 */
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

/**
 * Récupère une liste d'enseignants filtrée en fonction des paramètres de requête.
 *
 * @param {Request} req - L'objet de requête Express.
 * @param {Response} res - L'objet de réponse Express.
 * @returns {Promise<Response>} Une promesse résolue avec la réponse contenant la liste filtrée d'enseignants ou un message d'erreur.
 */
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

};

/**
 * Crée un nouvel enseignant en utilisant les données fournies dans le corps de la requête.
 *
 * @param {Request} req - L'objet de requête Express contenant les données du nouvel enseignant.
 * @param {Response} res - L'objet de réponse Express.
 * @returns {Promise<Response>} Une promesse résolue avec la réponse contenant les informations du nouvel enseignant ou un message d'erreur.
 */
export const createTeacher = async (req: Request, res: Response) => {
    try {
        const teachersRepository = AppDataStore.getRepository(Teacher);
        const newTeacher = new Teacher();

        await teachersRepository.merge(newTeacher, req.body).save();
        return Res.send(res, 200, created, newTeacher);

    } catch (error) {
        return Res.send(res, 500, messages.defaults.serverError, error);
    }
};

/**
 * Récupère un enseignant en fonction de son identifiant attribué.
 *
 * @param {Request} req - L'objet de requête Express.
 * @param {Response} res - L'objet de réponse Express.
 * @returns {Promise<Response>} Une promesse résolue avec la réponse contenant les informations de l'enseignant ou un message d'erreur.
 */
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

/**
 * Met à jour les informations d'un enseignant en fonction de l'identifiant fourni.
 *
 * @param {Request} req - L'objet de requête Express contenant les nouvelles données de l'enseignant.
 * @param {Response} res - L'objet de réponse Express.
 * @returns {Promise<Response>} Une promesse résolue avec la réponse contenant les informations mises à jour de l'enseignant ou un message d'erreur.
 */
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

/**
 * Supprime un enseignant en fonction de son identifiant.
 *
 * @param {Request} req - L'objet de requête Express.
 * @param {Response} res - L'objet de réponse Express.
 * @returns {Promise<Response>} Une promesse résolue avec la réponse indiquant que l'enseignant a été supprimé avec succès ou un message d'erreur.
 */
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