import { User } from "../entities";
import { AppDataSource } from "./data-source";

export const connectToDb = async () => {
    try {       
        console.log("Connecting to database...")
        await AppDataSource.initialize();
        console.log("Successfull connect to database...")       
    } catch (error) {
        console.warn("Error : ",error);   
    }
}