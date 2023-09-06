import { BulkWriteOptions, Filter, FindOptions, OptionalId, UpdateFilter, UpdateOptions, WithoutId } from "mongodb";
import { getCollection } from "../utils";


export const findOne = async (collectionName: string, query: Filter<Document>, options: FindOptions<Document> = {})  => {
	try {
		const  collection = getCollection(collectionName);
		const  result = await  collection.findOne(query, options);
        return  result;
	} catch (e) {
		console.log(`Erreur lors de l execution de la fonction findOne avec les parametres suivants: ${query}`);
		console.log(e);
		throw  e;
	}
}

export const find = async(collectionName: string, query: Filter<Document>, options: FindOptions<Document> = {}) => {
    try{
        const collection = getCollection(collectionName);
        const result = await collection.find(query,options).toArray();
        return result;
    } catch (e) {
		console.log(`Erreur lors de l execution de la fonction find avec les parametres suivants: ${query}`);
		console.log(e);
		throw  e;   
    }
}

export const insertOne = async (collectionName: string,doc: OptionalId<Document>,options: FindOptions<Document> = {}) => {
    try{
        const collection = getCollection(collectionName);
        const result = await collection.insertOne(doc,options);
        // return result
    } catch (e) {
        console.log(`Erreur lors de l execution de la fonction insertOne avec les parametres suivants: ${doc}`);
        console.log(e);
        throw  e;   
    }
}

export const insertMany = async (collectionName: string,doc: OptionalId<Document>[],options: BulkWriteOptions = {})=> {
    try{
        const collection = getCollection(collectionName);
        const result = await collection.insertMany(doc,options);
        // return result
    } catch (e) {
        console.log(`Erreur lors de l execution de la fonction insertMany avec les parametres suivants: ${doc}`);
        console.log(e);
        throw  e;   
    }
}

export const updateOne = async (collectionName: string,filter:Filter<Document>,update:UpdateFilter<Document> | Partial<Document>,options:UpdateOptions) => {
    try{
        const collection = getCollection(collectionName);
        const result = await collection.updateOne(filter,update,options);
        return result;
    } catch (e) {
        console.log(`Erreur lors de l execution de la fonction updateOne avec les parametres suivants: ${filter}`);
        console.log(e);
        throw  e;   
    }
}

export const updateMany = async (collectionName: string,filter: Filter<Document>, update: UpdateFilter<Document>, options: UpdateOptions) => {
    try{
        const collection = getCollection(collectionName);
        const result = await collection.updateMany(filter,update,options);
    } catch (e) {
        console.log(`Erreur lors de l execution de la fonction updateOne avec les parametres suivants: ${filter}`);
        console.log(e);
        throw  e;   
    }
}

export const replace = async(collectionName: string,filter: Filter<Document>,replacement: WithoutId<Document>) => {
    try{
        const collection = getCollection(collectionName);
        const result = await collection.replaceOne(filter,replacement);
    } catch (e) {
        console.log(`Erreur lors de l execution de la fonction replace avec les parametres suivants: ${filter}`);
        console.log(e);
        throw  e;   
    }
}

export const deleteOne = async (collectionName: string,filter: Filter<Document>) =>{
    try{
        const collection = getCollection(collectionName);
        const result = await collection.deleteOne(filter);
        return result;
    } catch (e) {
        console.log(`Erreur lors de l execution de la fonction deleteOne avec les parametres suivants: ${filter}`);
        console.log(e);
        throw  e;   
    }
}

export const deleteMany = async (collectionName: string,filter: Filter<Document>) =>{
    try{
        const collection = getCollection(collectionName);
        const result = await collection.deleteMany(filter);
        return result;
    } catch (e) {
        console.log(`Erreur lors de l execution de la fonction deleteMany avec les parametres suivants: ${filter}`);
        console.log(e);
        throw  e;   
    }
}
