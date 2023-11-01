import { Server } from "../src/server"
import request from "supertest";

export const testUser = {
    firstName : 'Anthony',
    lastName : 'ELUECQUE',
    password: 'test',
    email: 'anthony76520.ae@gmail.com'
}

export const loginUser = {
    email: 'anthony76520.ae@gmail.com',
    password: 'test'
}

const baseUrl = '/users'

export const connectionHandler = async (server: Server) => {
    const response = await request(server.getApp()).post(baseUrl).send(testUser)
    const loginResponse = await request(server.getApp()).post(baseUrl+'/login').send(loginUser)
    const cookies = loginResponse.headers['set-cookie']
    return cookies
}