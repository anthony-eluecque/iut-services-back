import "reflect-metadata";
import { DataSource } from "typeorm";
import { config } from "dotenv";

config();

export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.HOST,
    port: parseInt(process.env.DB_PORT),
    username: String(process.env.POSTGRES_USER),
    password: String(process.env.POSTGRES_PASSWORD),
    database: String(process.env.POSTGRES_DB),
    synchronize: true,
    logging: false,
    entities: ["./src/entities/*.ts"],
    migrations: ["./src/migrations/*.ts"],
    subscribers: [],
    
});
