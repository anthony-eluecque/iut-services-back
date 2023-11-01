import { Server } from "../src/server"
import request from "supertest";

export const requestGetHandler = async (
    server: Server,
    url : string,
    cookies?: string[]
) => {
    return cookies 
        ? request(server.getApp()).get(url).set('Cookie',cookies)
        : request(server.getApp()).get(url)
}

export const requestPostHandler = async (
    server: Server,
    url : string,
    cookies?: string[],
    data?: string|object
) => {

}