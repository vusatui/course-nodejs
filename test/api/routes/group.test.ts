import express, {Application, Router} from "express";
import {Connection, createConnection} from "typeorm";
import GroupRepositoryService from "../../../src/services/GroupRepositoryService";
import GroupService from "../../../src/services/GroupService";
import groupRoutes from "../../../src/api/routes/group";
import {Permission} from "../../../src/services/GroupService/types";
import request from "supertest";
import UserService from "../../../src/services/UserService";
import UserRepositoryService from "../../../src/services/UserRepositoryService";


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
    let createdGroupId: number;
    let userService: UserService;
    let createdUserId: number;

    const groupDTO = {
        name: "test group",
        permissions: [
            Permission.READ,
        ],
    };

    beforeAll(async () => {
        app = express();
        app.use(express.json());

        const router = Router();

        const groupRepositoryService = new GroupRepositoryService();
        const groupService = new GroupService(groupRepositoryService);

        const userRepositoryService = new UserRepositoryService()
        userService = new UserService(userRepositoryService);

        groupRoutes(router, groupService);
        app.use(router);

        connection = await createConnection();
    });

    afterAll(() => {
        connection.close();
    })

    test("CREATE group", async () => {
        const response = await request(app)
            .post("/group")
            .send(groupDTO);

        createdGroupId = response.body.result.id;

        expect(response.status).toBe(200);
        expect(createdGroupId).toBeDefined();
    })

    test("UNSUCCESSFUL group creation", async () => {
        const response = await request(app)
            .post("/group");

        expect(response.status).toBe(500);
    });

    test("addUsersToGroup", async () => {
        createdUserId = await userService.createUser({
            login: "admin",
            password: "pass",
            age: 18
        });

        expect(createdUserId).toBeDefined();

        const response = await request(app)
            .post("/group/addUsersToGroup")
            .send({
                groupId: createdGroupId,
                userIds: [createdUserId],
            });

        expect(response.status).toBe(200);
    });

    test("GET group", async () => {
        const response = await request(app)
            .get(`/group/${createdGroupId}`);

        const group = response.body.result.group;

        expect(group).toBeDefined();
        expect(group.id).toBe(createdGroupId);
    });

    test("PUT group", async () => {
        const response = await request(app)
            .put(`/group/${createdGroupId}`)
            .send({
                name: "Updated name",
            });

        const id = response.body.result.id;

        expect(id).toBeDefined();
        expect(id).toBe(createdGroupId);
    });

    test("DELETE group", () => {
        return request(app)
            .delete(`/group/${createdGroupId}`)
            .expect(200);
    })
});
