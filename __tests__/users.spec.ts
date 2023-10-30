import { initDbStoreForTests } from "../src/config"
import request from "supertest";
import app from "../src/routes/index";


const runFirstTest = () => it('should get all Users', async () => {
    await initDbStoreForTests()
    const response = await request(app).get('/users').send()
    expect(response.statusCode).toBe(200)
})

describe("User routes test",() => {
    beforeEach(async () => {
        console.log("Before each is executed...");
        await initDbStoreForTests();
    });
    runFirstTest();
})