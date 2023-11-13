import { initDbStoreForTests } from "../src/config"
import request from "supertest";
import app from "../src/routes/index";
import { Server } from "../src/server";
import { connectionHandler, loginUser, testUser } from "./connectionHandler";
import { requestGetHandler } from "./requestHandler";

const server = new Server()
server.setRoutes()

const baseUrl = '/users'

const runFirstTest = () => it('Unauthorized to get all users', async () => {
    const response = await request(server.getApp()).get(baseUrl)
    expect(response.statusCode).toBe(401)
})

const runSecondTest = () => it('Get all users when logged', async () => {
    const cookies = await connectionHandler(server)
    //admin
    const response = await requestGetHandler(server,baseUrl,cookies)
    expect(response.statusCode).toBe(200)
})

const runThirdTest = () => it('Post one user',async () => {
    const response = await request(server.getApp()).post(baseUrl).send(testUser)
    expect(response.statusCode).toBe(200)
})

const runFourthTest = () => it('Login as user', async () => {
    const response = await request(server.getApp()).post(baseUrl).send(testUser)
    const loginResponse = await request(server.getApp()).post(baseUrl+'/login').send(loginUser)
    expect(loginResponse.statusCode).toBe(204)
})


const runFifthTest = () => it('Login as user and auth myself', async () => {
    const cookies = await connectionHandler(server)
    const authResponse = await request(server.getApp()).get(baseUrl+'/auth').set('Cookie',cookies)
    expect(authResponse.statusCode).toBe(200)
})


const runSixthTest = () => it('Login and logout myself', async () => {
    const cookies = await connectionHandler(server)
    const logoutResponse = await request(server.getApp()).post(baseUrl+'/logout').set('Cookie',cookies)
    expect(logoutResponse.statusCode).toBe(204)
})

const runSeventhTest = () => it('Reset a password', async () => {
    const cookies = await connectionHandler(server)
    const logoutResponse = await request(server.getApp()).post(baseUrl+'/resetPassword').set('Cookie',cookies)
    expect(logoutResponse.statusCode).toBe(204)
})

const runEighthTest = () => it('Change a password', async () => {
    const cookies = await connectionHandler(server)
    const logoutResponse = await request(server.getApp()).post(baseUrl+'/changePassword').set('Cookie',cookies)
    expect(logoutResponse.statusCode).toBe(204)
})

const runNinthTest = () => it('Forgot a password', async () => {
    const logoutResponse = await request(server.getApp()).post(baseUrl+'/forgotPassword')
    expect(logoutResponse.statusCode).toBe(204)
})

const runTenthTest = () => it('Delete account', async () => {
    const logoutResponse = await request(server.getApp()).post(baseUrl+'/deleteAccount')
    expect(logoutResponse.statusCode).toBe(204)
})

const runEleventhTest = () => it('Get one user by id', async () => {
    const cookies = await connectionHandler(server)
    const postResponse = await request(server.getApp()).post(baseUrl).set('Cookie',cookies).send(testUser)
    const getResponse = await requestGetHandler(server,baseUrl+'/'+postResponse.body.data.id,cookies)
    expect(getResponse.statusCode).toBe(200)
})

const runTwelfthTest = () => it('Update one user',async () => {
    const cookies = await connectionHandler(server)
    // const postResponse = await request(server.getApp()).post(baseUrl).set('Cookie',cookies).send(testUser)
    const updatedUser = {
        firstName : 'Firstname User updated',
        lastName : 'Lastname User updated',
        password: 'password User updated',
        email: 'user.updated@gmail.com',
        
        // id : postResponse.body.data.id
    }
    const updateResponse = await request(server.getApp()).put(baseUrl).set('Cookie',cookies).send(updatedUser)
    expect(updateResponse.statusCode).toBe(200)
})

const runThirteenthTest = () => it('Delete one user by id', async () => {
    const cookies = await connectionHandler(server)
    const postResponse = await request(server.getApp()).post(baseUrl).set('Cookie',cookies).send(testUser)
    const getResponse = await request(server.getApp()).delete(baseUrl+"/"+postResponse.body.data.id).set('Cookie',cookies)
    expect(getResponse.statusCode).toBe(200)
}) 

describe("Users routes test",() => {
    beforeEach(async () => {
        console.log("Before each is executed...");
        await initDbStoreForTests();
    });
    runFirstTest();
    // runSecondTest();
    runThirdTest();
    runFourthTest();
    runFifthTest();
    runSixthTest();
    // runSeventhTest();
    // runEighthTest();
    // runNinthTest();
    // runTenthTest();
    runEleventhTest();
    // runTwelfthTest();
    // runThirteenthTest();
})