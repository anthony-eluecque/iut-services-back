import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "../entities";
import { Lesson } from "../entities/lesson.entity";
import { Teacher } from "../entities/teacher.entity";
import { Item } from "../entities/item.entity";
import { Role } from "../entities/role.entity";
import { Service } from "../entities/service.entity";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: parseInt(process.env.DB_PORT),
    username: String(process.env.POSTGRES_USER),
    password: String(process.env.POSTGRES_PASSWORD),
    database: String(process.env.POSTGRES_DB),
    synchronize: true,
    logging: false,
    entities: [Lesson, Item, User, Teacher, Role, Service],
    migrations: [],
    subscribers: [],
});
