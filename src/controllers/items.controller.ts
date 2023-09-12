import {Request, Response} from 'express'
import { Item } from '../models'

export const getAllItems = async (req: Request, res: Response) => {
    try {
        return res.status(200).send(await Item.find({}))
    } catch (error) {

    }
}

export const getItems = async (req: Request, res: Response) => {
    try {
        let page = parseInt(req.params.page)
        if (!page){
            page = 1;
        }

        const pageCount = 5;
        
        const result = await Item.find()
            .limit(pageCount)
            .skip((page-1)*pageCount)
    
        return res.status(200).send(result);


    } catch (error) {
        
    }
}

export const getItem = async (req: Request, res: Response) => {
    try {
        
    } catch (error) {
        
    }
}

export const createItem = async (req: Request, res: Response) => {
    try {
        const itemData = req.body;
        const newItem = new Item(itemData);
        await newItem.validate()
        await newItem.save();
        res.status(201).json(newItem);

    } catch (error) { 
        console.log("Error (createItem) : ", error);
        res.status(500).json({error : `Error : createItem ${error}`});
    }
}


export const deleteItem = async (req: Request, res: Response) => {
    try {
        const item = await Item.findById(req.params.id);
        if (!item){
            res.status(404).json({error : "Not found (404)"});
        }
        await Item.deleteOne({_id : item.id});
        res.status(200).json("Item has been delete");

    } catch (error) {
        
    }
}

export const updateItem = async (req: Request, res: Response) => {
    try {
        const opts = { runValidator : true, new : true }
        const result = await Item.findByIdAndUpdate(req.body.id,req.body,opts);     
        
        if (!result){
            await res.status(400).json({error:"Item not found"});
        }
        await res.status(200).json(result);
    } catch (error) {
        console.log("Error (updateItem) : ", error);
        res.status(500).json({error : `Error : updateItem ${error}`}); 
    }
}