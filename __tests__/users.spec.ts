import { initDbStoreForTests } from "../src/config"
import request from "supertest";
import app from "../src/routes/index";
import { Server } from "../src/server";

const server = new Server()
server.setRoutes()

const baseUrl = '/users'

const testUser = {
    firstName : 'Anthony',
    lastName : 'ELUECQUE',
    password: 'test',
    email: 'anthony76520.ae@gmail.com'
}

const loginUser = {
    email: 'anthony76520.ae@gmail.com',
    password: 'test'
}

const runFirstTest = () => it('Unauthorized to get all users', async () => {
    const response = await request(server.getApp()).get(baseUrl)
    expect(response.statusCode).toBe(401)
})

const runSecondTest = () => it('Post one user',async () => {
    const response = await request(server.getApp()).post(baseUrl).send(testUser)
    expect(response.statusCode).toBe(200)
})

const runThirdTest = () => it('Login as user', async () => {
    const response = await request(server.getApp()).post(baseUrl).send(testUser)
    const loginResponse = await request(server.getApp()).post(baseUrl+'/login').send(loginUser)
    expect(loginResponse.statusCode).toBe(204)
})


const runFourthTest = () => it('Login as user and auth myself', async () => {
    const response = await request(server.getApp()).post(baseUrl).send(testUser)
    const loginResponse = await request(server.getApp()).post(baseUrl+'/login').send(loginUser)
    const cookies = loginResponse.headers['set-cookie']
    const authResponse = await request(server.getApp()).get(baseUrl+'/auth').set('Cookie',cookies)
    expect(authResponse.statusCode).toBe(200)
})


const runFifthTest = () => it('Login and logout myself', async () => {
    const response = await request(server.getApp()).post(baseUrl).send(testUser)
    const loginResponse = await request(server.getApp()).post(baseUrl+'/login').send(loginUser)
    const cookies = loginResponse.headers['set-cookie']
    const logoutResponse = await request(server.getApp()).post(baseUrl+'/logout').set('Cookie',cookies)
    expect(logoutResponse.statusCode).toBe(204)
})

describe("Users routes test",() => {
    beforeEach(async () => {
        console.log("Before each is executed...");
        await initDbStoreForTests();
    });
    runFirstTest();
    runSecondTest();
    runThirdTest();
    runFourthTest();
    runFifthTest();
})