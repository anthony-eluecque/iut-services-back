import { initDbStoreForTests } from "../src/config";
import request from "supertest";
import { Server } from "../src/server";
import { connectionHandler } from "./connectionHandler";
import { requestGetHandler } from "./requestHandler";

const server = new Server()
server.setRoutes()
const baseUrl = '/lessons'

const testLessons  = {
    name : 'Maths',
    givenId : '0568',
}


const runFirstTest = () => it('Unauthorized without being logged', async () => {
    const response = await requestGetHandler(server,baseUrl)
    expect(response.statusCode).toBe(401)
})

const runSecondTest = () => it('Get all lessons when logged', async () => {
    const cookies = await connectionHandler(server)
    const response = await requestGetHandler(server,baseUrl,cookies)
    expect(response.statusCode).toBe(200)
})

const runThirdTest = () => it('Post one lesson', async () => {
    const cookies = await connectionHandler(server)
    const response = await request(server.getApp()).post(baseUrl).set('Cookie',cookies).send(testLessons)
    expect(response.statusCode).toBe(200)
})

const runFourthTest = () => it('Get one lesson by id', async () => {
    const cookies = await connectionHandler(server)
    const postResponse = await request(server.getApp()).post(baseUrl).set('Cookie',cookies).send(testLessons)
    const getResponse = await requestGetHandler(server,baseUrl+'/'+postResponse.body.data.id,cookies)
    expect(getResponse.statusCode).toBe(200)
})

const runFifthTest = () => it('Delete one lesson by id', async () => {
    const cookies = await connectionHandler(server)
    const postResponse = await request(server.getApp()).post(baseUrl).set('Cookie',cookies).send(testLessons)
    const getResponse = await request(server.getApp()).delete(baseUrl+"/"+postResponse.body.data.id).set('Cookie',cookies)
    expect(getResponse.statusCode).toBe(200)
}) 

const runSixthTest = () => it('Get lesson by givenId', async () => {
    const cookies = await connectionHandler(server)
    const postResponse = await request(server.getApp()).post(baseUrl).set('Cookie',cookies).send(testLessons)
    const getResponse = await requestGetHandler(server,baseUrl+"/givenid/"+postResponse.body.data.givenId,cookies)
    expect(getResponse.statusCode).toBe(200)
})

describe("Lessons routes test",() => {
    beforeEach(async () => {
        console.log("Before each is executed...");
        await initDbStoreForTests();
    });
    runFirstTest();
    runSecondTest();
    runThirdTest();
    runFourthTest();
    runFifthTest();
    runSixthTest();
})
