import { config } from "dotenv";
import { DataSource, DataSourceOptions } from "typeorm"
import { rootFolder } from "../rootFolder";


config()

const getDirEntities = () => {
    const isTsNode = process.env.TS_NODE_DEV;
    // A CHANGER ICI POUR LA PROD
    const dirNameEntities = isTsNode ? rootFolder + '/entities/*.ts' : rootFolder + '/entities/*.ts';
    return dirNameEntities
}

const getDirMigrations = () =>{
    const migrations = `${__dirname}/migrations/*.ts`
    return migrations
}


const getDbSettings = () => {
    const dbSettings: DataSourceOptions = {
        type: "postgres",
        host: process.env.HOST,
        port: parseInt(process.env.DB_PORT),
        username: String(process.env.POSTGRES_USER),
        password: String(process.env.POSTGRES_PASSWORD),
        database: String(process.env.POSTGRES_DB),
        synchronize: true,
        logging: false,
        entities: [getDirEntities()],
        migrations: [getDirMigrations()],
        subscribers: [],
    }
    return dbSettings
}

export let AppDataStore: DataSource = new DataSource(getDbSettings())

export const initDbStore = async () => {
    try {
        await AppDataStore.initialize()
        console.log(`Db initialized. Host: ${getDbSettings().host}, port: ${getDbSettings().port}`)
    } catch (err) {
        console.error(`dbConnectionManager - error initializing db. Error: ${err.message}`)
    }
}
/**
 * Should be used for unit testing in memory db
 */
export const initDbStoreForTests = async () => {
    const dbSettings ={
        type: "sqlite",
        database: ":memory:",
        dropSchema: true,
        entities: [getDirEntities()],
        synchronize: true,
        logging: false
    } as any;
    try {
        AppDataStore = new DataSource(dbSettings)
        await AppDataStore.initialize()
        console.log(`In memory Db initialized`)
    } catch (err) {
        console.error(`dbConnectionManager - error initializing db. Error: ${err.message}`)
    }
}