// import { Request, Response } from 'express';
// import { Role, Teacher } from '../entities';
// import { AppDataSource } from '../config';
// import Res from '../helpers/res.helper';
// import { getAll } from './abstract.controller';
// import messages from '../docs/messages.json';

// const { created, notFound } = messages.roles;

// const options = { relations : ['teachers']};
// const rolesRepository = AppDataSource.getRepository(Role);
// const teachersRepository = AppDataSource.getRepository(Teacher);

// export const getRoles = (req: Request, res: Response) => getAll(req, res, rolesRepository,options.relations);

// export const createRole = async (req: Request, res: Response) => {
//     try {
//         const newRole = new Role();
//         newRole.teachers = [];
//         await rolesRepository.merge(newRole, req.body).save();
//         return Res.send(res, 200, created, newRole);
//     } catch (error) {
//         return Res.send(res, 500, messages.defaults.serverError, error);
//     }
// };

// export const deleteRoleById = async (req: Request, res: Response) => {
//     try {
//         const id = req.params.id;
//         const role = await rolesRepository.findOne({ where: { id }, relations : options.relations });
//         if (!role) return Res.send(res, 404, notFound);
        
//         for (const teacher of role.teachers) {
//             teacher.role = null; 
//             await teachersRepository.save(teacher); 
//         }
//         await rolesRepository.remove(role);

//         return Res.send(res, 200, messages.defaults.deleted);
//     } catch (error) {
//         return Res.send(res, 500, messages.defaults.serverError, error);
//     }
// };