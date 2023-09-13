import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "../entities"
import { Lesson } from "../entities/lesson.entity"
import { Teacher } from "../entities/teacher.entity"
import { Item } from "../entities/item.entity"


export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5433,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: true,
    logging: false,
    // entities: [__dirname + "/src/entities/*{.js,.ts}"],
    entities:[Lesson,Item,User,Teacher],
    migrations: [],
    subscribers: [],
})
