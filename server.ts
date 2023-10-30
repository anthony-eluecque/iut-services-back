import * as path from "path"
import "reflect-metadata";
import { config } from 'dotenv';
import { displayEnv } from "dotenv-display"
import { initDbStore } from "./src/config";

let configPath = path.join(__dirname, "./.env")
let env = config({path: configPath});

import { Server } from './src/server';


// displayEnv(env.parsed)

const server = new Server()
// server.setSwagger()

server.initDb()
server.setRoutes()
server.setSwagger()
server.startServer()

// const options = {
//     definition: {
//       openapi: "3.1.0",
//       info: {
//         title: "LogRocket Express API with Swagger",
//         version: "0.1.0",
//         description:
//           "This is a simple CRUD API application made with Express and documented with Swagger",
//         license: {
//           name: "MIT",
//           url: "https://spdx.org/licenses/MIT.html",
//         },
//         contact: {
//           name: "LogRocket",
//           url: "https://logrocket.com",
//           email: "info@email.com",
//         },
//       },
//       servers: [
//         {
//           url: "http://localhost:3000",
//         },
//       ],
//     },
//     apis: ["./routes/*.js"],
// };
  
//   const specs = swaggerJsdoc(options);
//   app.use(
//     "/api-docs",
//     swaggerUi.serve,
//     swaggerUi.setup(specs)
//   );
