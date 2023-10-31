import * as path from "path"
import "reflect-metadata";
import { config } from 'dotenv';
import { displayEnv } from "dotenv-display"
import { Server } from './src/server';

let configPath = path.join(__dirname, "./.env")
let env = config({path: configPath});

// displayEnv(env.parsed)

const server = new Server()
server.initDb()
server.setRoutes()
server.setSwagger()
server.startServer()
