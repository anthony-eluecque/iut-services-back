import express,{ Express } from 'express'
import { config } from 'dotenv';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import cors from 'cors';
import useRouter from './routes'
import { initDbStore } from './config';
import swaggerUI from 'swagger-ui-express' 
import { options } from './swagger';
import swaggerJSDoc from "swagger-jsdoc";

config()
export class Server {
    private app : Express;
    private port : any = 3000;

    constructor() {
        this.app = express();
        this.app.use(cookieParser());
        this.app.use(bodyParser.json())

        this.app.use(cors({
            origin : [
              process.env.CORS_ORIGIN
            ],
            credentials : true
          }));

        this.port = process.env.NODEJS_PORT || this.port;
    }

    public async initDb(){
        try {
            await initDbStore();
            console.log("Database initialized successfully");
          } catch (err) {
            console.error(`Error initializing database: ${err.message}`);
            process.exit(1); // Arrêtez le processus en cas d'erreur grave
        }
    }

    public startServer = () => {
        this.onServerListen();
    }
    
    private onServerListen = () => {
        this.app.listen(this.port, () => {
            console.log(`Express is listening at http://localhost:${this.port}`);
            console.log(`For exploring the apis open: http://localhost:${this.port}/api-docs`)
        });
    }

    public setSwagger = () => {
        const swaggerSpec = swaggerJSDoc(options)
        this.app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));
    }

    public setRoutes = () => {
        this.app.use(useRouter)
    }


}