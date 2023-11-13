import { initDbStoreForTests } from "../src/config";
import request from "supertest";
import { Server } from "../src/server";
import { connectionHandler } from "./connectionHandler";
import { requestGetHandler } from "./requestHandler";
import {testLessons} from "./lessons.spec";
import {testServices} from "./services.spec";

const server = new Server()
server.setRoutes()
const baseUrl = '/items'

const testItems  = {
    lesson: testLessons,
    service: testServices
}

const runFirstTest = () => it('Unauthorized without being logged', async () => {
    const response = await requestGetHandler(server,baseUrl)
    expect(response.statusCode).toBe(401)
})

// const runSecondTest = () => it('Get all lessons when logged', async () => {
//     const cookies = await connectionHandler(server)
//     //admin
//     const response = await requestGetHandler(server,baseUrl,cookies)
//     expect(response.statusCode).toBe(200)
// })

const runThirdTest = () => it('Post one item', async () => {
    const cookies = await connectionHandler(server)
    const response = await request(server.getApp()).post(baseUrl).set('Cookie',cookies).send(testItems)
    expect(response.statusCode).toBe(200)
})

// const runFourthTest = () => it('Get one item by page', async () => {
//     const cookies = await connectionHandler(server)
//     const postResponse = await request(server.getApp()).post(baseUrl).set('Cookie',cookies).send(testLessons)
//     // const getResponse = await requestGetHandler(server,baseUrl+'/'+(page),cookies)
//     // expect(getResponse.statusCode).toBe(200)
// })

const runFifthTest = () => it('Delete one item by id', async () => {
    const cookies = await connectionHandler(server)
    const postResponse = await request(server.getApp()).post(baseUrl).set('Cookie',cookies).send(testItems)
    const getResponse = await request(server.getApp()).delete(baseUrl+"/"+postResponse.body.data.id).set('Cookie',cookies)
    expect(getResponse.statusCode).toBe(200)
}) 

// const runSixthTest = () => it('Update one item',async () => {
//     const cookies = await connectionHandler(server)
//     const postResponse = await request(server.getApp()).post(baseUrl).set('Cookie',cookies).send(testItems)
//     const updatedItem = {
//         // firstName : 'Firstname Teacher updated',
//         // givenId : '123456789 updated',
//         // lastName : 'Lastname Teacher updated',
//         // id : postResponse.body.data.id
//     }
//     const updateResponse = await request(server.getApp()).put(baseUrl).set('Cookie',cookies).send(updatedItem)
//     expect(updateResponse.statusCode).toBe(200)
// })

const runSeventhTest = () => it('Get item by Id', async () => {
    const cookies = await connectionHandler(server)
    const postResponse = await request(server.getApp()).post(baseUrl).set('Cookie',cookies).send(testItems)
    const getResponse = await requestGetHandler(server,baseUrl+"/item/"+postResponse.body.data.givenId,cookies)
    expect(getResponse.statusCode).toBe(200)
})


describe("Items routes test",() => {
    beforeEach(async () => {
        console.log("Before each is executed...");
        await initDbStoreForTests();
    });
    runFirstTest();
    // runSecondTest();
    runThirdTest();
    runFifthTest();
    runSeventhTest();
 
})