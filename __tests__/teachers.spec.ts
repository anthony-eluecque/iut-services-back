import { initDbStoreForTests } from "../src/config";
import request from "supertest";
import { Server } from "../src/server";
import { connectionHandler } from "./connectionHandler";
import { requestGetHandler } from "./requestHandler";

const server = new Server()
server.setRoutes()
const baseUrl = '/teachers'

export const testTeacher  = {
    firstName : 'Firstname Teacher',
    givenId : '123456789',
    lastName : 'Lastname Teacher'
}


const runFirstTest = () => it('Unauthorized without being logged', async () => {
    const response = await requestGetHandler(server,baseUrl)
    expect(response.statusCode).toBe(401)
})


const runSecondTest = () => it('Get all teachers when logged', async () => {
    const cookies = await connectionHandler(server)
    const response = await requestGetHandler(server,baseUrl,cookies)
    expect(response.statusCode).toBe(200)
})

const runThirdTest = () => it('Post one teacher', async () => {
    const cookies = await connectionHandler(server)
    const response = await request(server.getApp()).post(baseUrl).set('Cookie',cookies).send(testTeacher)
    expect(response.statusCode).toBe(200)
})

const runFourthTest = () => it('Get one teacher by id', async () => {
    const cookies = await connectionHandler(server)
    const postResponse = await request(server.getApp()).post(baseUrl).set('Cookie',cookies).send(testTeacher)
    const getResponse = await requestGetHandler(server,baseUrl+'/'+postResponse.body.data.id,cookies)
    expect(getResponse.statusCode).toBe(200)
})

const runFifthTest = () => it('Delete one teacher by id', async () => {
    const cookies = await connectionHandler(server)
    const postResponse = await request(server.getApp()).post(baseUrl).set('Cookie',cookies).send(testTeacher)
    const getResponse = await request(server.getApp()).delete(baseUrl+"/"+postResponse.body.data.id).set('Cookie',cookies)
    expect(getResponse.statusCode).toBe(200)
}) 

const runSixthTest = () => it('Update one teacher',async () => {
    const cookies = await connectionHandler(server)
    const postResponse = await request(server.getApp()).post(baseUrl).set('Cookie',cookies).send(testTeacher)
    const updatedTeacher = {
        firstName : 'Firstname Teacher updated',
        givenId : '123456789 updated',
        lastName : 'Lastname Teacher updated',
        id : postResponse.body.data.id
    }
    const updateResponse = await request(server.getApp()).put(baseUrl).set('Cookie',cookies).send(updatedTeacher)
    expect(updateResponse.statusCode).toBe(200)
})


const runSeventhTest = () => it('Get teacher by givenId', async () => {
    const cookies = await connectionHandler(server)
    const postResponse = await request(server.getApp()).post(baseUrl).set('Cookie',cookies).send(testTeacher)
    const getResponse = await requestGetHandler(server,baseUrl+"/givenid/"+postResponse.body.data.givenId,cookies)
    expect(getResponse.statusCode).toBe(200)
})

describe("Teachers routes test",() => {
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
    runSeventhTest();
})