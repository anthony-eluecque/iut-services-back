import { rootFolder } from "./rootFolder";

export const options = {
    definition: {
        openapi: "3.1.0",
        info: {
          title: "REST API for Swagger Documentation",
          version: "1.0.0",
        },
        schemes: ["http", "https"],
      },    
    consumes: [
        "application/json"
    ],
    produces: [
        "application/json"
    ],
    apis: [
        `${rootFolder}/routes/*.ts`,
        "./dist/routes/*.js",
        `${rootFolder}/entities/*.ts`,
        "./dist/entities/*.js"
    ],
}