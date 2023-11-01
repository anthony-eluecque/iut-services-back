import { initDbStoreForTests } from "../src/config";
import request from "supertest";
import { Server } from "../src/server";
import { connectionHandler } from "./connectionHandler";
import { requestGetHandler } from "./requestHandler";
import { Item, Service } from "../src/entities";



const server = new Server()
server.setRoutes()
const baseUrl = '/services'


const runFirstTest = () => it('Unauthorized without being logged', async () => {
    const response = await requestGetHandler(server,baseUrl)
    expect(response.statusCode).toBe(401)
})

const runSecondTest = () => it('Post one Service but teacher doesnt exist', async () => {
    const cookies = await connectionHandler(server)
    const testService = {
        items : [],
        teacher : null,
        year: 2023
    }
    const response = await request(server.getApp()).post(baseUrl).set('Cookie',cookies).send(testService)
    expect(response.statusCode).toBe(404)
})

// const runThirdTest = () => it('Post one Service but items doesnt exist', async () => {
//     const cookies = await connectionHandler(server)
//     const response = await request(server.getApp()).post(baseUrl).set('Cookie',cookies).send(testService)
//     const testTeachers = []
    
//     const testService = {
//         items : [
//             {
//                 id : 'e4019198-1ef9-447a-9bc7-0984ec2326f3',
//                 amountHours : 0,
//                 lesson : null,
//                 lessonTypes : [],
//             }
//         ],
//         year: 2023
//     }
// })


describe("Services routes test", () => {
    beforeEach(async () => {
        console.log("Before each is executed...");
        await initDbStoreForTests();
    });
    runFirstTest();
    runSecondTest();

})