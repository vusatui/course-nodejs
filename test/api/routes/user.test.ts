import request from "supertest";
import express, { Application, Router } from "express";
import userRoutes from "../../../src/api/routes/user"
import UserService from "../../../src/services/UserService";
import UserRepositoryService from "../../../src/services/UserRepositoryService";
import {Connection, createConnection} from "typeorm";

jest.mock(
    "../../../src/api/middlewares/validateToken",
    () => jest.fn(() => (req, res, next) => next()),
);
jest.mock(
    "../../../src/api/middlewares/logRequest",
    () => jest.fn(() => (req, res, next) => next()),
);

jest.setTimeout(1000 * 60 * 60);

describe("Testing user routes", () => {
    let app: Application;
    let connection: Connection;
    let createdUserId: number;

    const userDTO = {
        "login": "Test user 111",
        "password": "password",
        "age": 25
    }

    beforeAll(async () => {
        app = express();
        app.use(express.json());

        const router = Router();
        const userRepositoryService = new UserRepositoryService();
        const userService = new UserService(userRepositoryService);

        userRoutes(router, userService)
        app.use(router);

        connection = await createConnection();
    })

    afterAll(() => {
        connection.close();
    })

    test("CREATE user", async () => {
        const response = await request(app)
            .post("/user")
            .send(userDTO);

        const { result: { id } } = response.body;

        expect(response.status).toBe(200);
        expect(id).toBeDefined();

        createdUserId = id;
    });

    test("UNSUCCESSFUL creation new user", () => {
        return request(app)
            .post("/user")
            .send({
                "password": "password",
                "age": 25
            })
            .expect(400)
    });

    test("GET user by id", async () => {
        const response = await request(app)
            .get( `/user/${createdUserId}`);

        expect(response.status).toBe(200);
        expect(response.body.result.user.login).toBe(userDTO.login)
    });

    test("PUT user by id", async () => {
        const response = await request(app)
            .put( `/user/${createdUserId}`)
            .send({ login: "test", password: userDTO.password, age: userDTO.age });

        expect(response.status).toBe(200);
        expect(response.body.result.id).toBe(createdUserId);
    });

    test("DELETE user by id", async () => {
        const response = await request(app)
            .delete( `/user/${createdUserId}`)
            .send({ id: createdUserId });

        expect(response.status).toBe(200);
    });

    test("Bag get auto suggest Users", () => {
        return request(app)
            .get("/user/getAutoSuggestUsers")
            .expect(400)
    });

    test("Get auto suggest Users", () => {
        return request(app)
            .get("/user/getAutoSuggestUsers")
            .send({ limit: 100, loginSubstring: "" })
            .expect(200)
    });


});
