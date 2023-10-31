import { initDbStoreForTests } from "../src/config"
import request from "supertest";
import app from "../src/routes/index";
import { Server } from "../src/server";

const server = new Server()
server.setRoutes()

const baseUrl = '/users'

const runFirstTest = () => it('Unauthorized to get all users', async () => {
    const response = await request(server.getApp()).get(baseUrl)
    expect(response.statusCode).toBe(401)
})

const runSecondTest = () => it('Post one user',async () => {
    const user = {
        firstName : 'Anthony',
        lastName : 'ELUECQUE',
        password: 'test',
        email: 'anthony76520.ae@gmail.com'
    }
    const response = await request(server.getApp()).post(baseUrl).send(user)
    expect(response.statusCode).toBe(200)
})

describe("User routes test",() => {
    beforeEach(async () => {
        console.log("Before each is executed...");
        await initDbStoreForTests();
    });
    runFirstTest();
    runSecondTest();
})