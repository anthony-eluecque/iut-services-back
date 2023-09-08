import { Response, Request } from 'express';
import { Service } from '../models';
import mongoose from 'mongoose';
import { getAll } from './abstract.controller';

export const getAllServices = async (req: Request, res : Response) => getAll(req,res,Service)

export const getServices = async (req : Request ,res : Response) => {

    try {
        if (!req.params.page){
            res.status(500).json({error : "You need to select a page"});
        }

        let perPage = 5, page = Math.max(0, parseInt(req.params.page) - 1) 

        res.status(200).json(await Service.find({})
            .limit(perPage)
            .skip((perPage * page)) 
            .populate(["teacher","items"])
        )

    } catch (error) {
        console.log("Error (getServices) : ", error);
        res.status(500).json({error : "Error : getServices"});
    }
};

export const createService = async (req : Request, res : Response) => {

    try {
        const serviceData = req.body;
        const newService = new Service(serviceData);
        await newService.save();
        res.status(201).json(newService);

    } catch (error) {   
        console.log("Error (createService) : ", error);
        res.status(500).json({error : "Error : createService"});
    }
};

export const deleteService = async (req: Request, res : Response) => {
    try {
        const idToDelete = req.query.id as string;
        if (!mongoose.Types.ObjectId.isValid(idToDelete)) {
            return res.status(400).json({ error: 'ID invalide' });
        }
        const response = await Service.deleteOne({_id : idToDelete})
        if (response.deletedCount > 0){
            res.status(200).json({ message: 'Service deleted with success!' });
        } else { res.status(404).json({ message: 'Service not found' }); }
    } catch (error) {
        res.status(500).json({error : "Error : deleteService"})
    }
}
