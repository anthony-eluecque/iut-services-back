import { config } from "dotenv";
import { DataSource, DataSourceOptions } from "typeorm"
import { rootFolder } from "../rootFolder";


config()

/**
 * Génère le chemin du répertoire des entités en fonction de la variable d'environnement TS_NODE_DEV.
 * Le chemin peut être en .ts pour le développement (TS_NODE_DEV présent), ou en .js ou .ts pour la production.
 * Utilisé dans la configuration de la base de données.
 * @returns {string} - Le chemin du répertoire des entités.
 */
const getDirEntities = () => {
    const isTsNode = process.env.TS_NODE_DEV;
    // A CHANGER ICI POUR LA PROD
    const dirNameEntities = isTsNode ? rootFolder + '/entities/**.{js,ts}' : rootFolder + '/entities/**.ts';
    console.log(dirNameEntities)
    return dirNameEntities
}

/**
 * Retourne le chemin du répertoire des migrations.
 * @returns {string} - Le chemin du répertoire des migrations.
 */
const getDirMigrations = () =>{
    const migrations = `${rootFolder}/migrations/*.ts`
    return migrations
}

/**
 * Crée et retourne un objet de configuration de la base de données (dbSettings) basé sur les variables d'environnement.
 * @returns {DataSourceOptions} - Configuration de la base de données.
 */
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

/**
 * Instance de DataSource utilisant la configuration de la base de données obtenue avec getDbSettings.
 */
export let AppDataStore: DataSource = new DataSource(getDbSettings())

/**
 * Initialise la base de données en appelant la méthode initialize de AppDataStore.
 * Affiche un message de journalisation si l'initialisation réussit.
 */
export const initDbStore = async () => {
    try {
        await AppDataStore.initialize()
        console.log(`Db initialized. Host: ${getDbSettings().host}, port: ${getDbSettings().port}`)
    } catch (err) {
        console.error(`dbConnectionManager - error initializing db. Error: ${err.message}`)
    }
}

/**
 * Initialise une base de données en mémoire pour les tests unitaires.
 * Crée une configuration de base de données spécifique pour les tests en utilisant SQLite avec une base de données en mémoire.
 * Réinitialise AppDataStore avec la nouvelle configuration.
 * Affiche un message de journalisation si l'initialisation réussit.
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