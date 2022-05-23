import UserService from "../../src/services/UserService";
import UserRepositoryService from "../../src/services/UserRepositoryService";
import { User } from "../../src/services/UserService/types";
import spyOn = jest.spyOn;
import UserModel from "../../src/models/UserModel";


describe("UserService", () => {
    let userService: UserService | null;
    let userMock: User = {
        login: "login",
        password: "pass",
        age: 18,
    }

    const userModel = new UserModel();
    userModel.id = 1;
    Object.assign(userModel, userMock);


    beforeAll(() => {
        UserRepositoryService.prototype.createUser = jest.fn().mockImplementation((userDTO: User) => Promise.resolve(userModel.id));
        UserRepositoryService.prototype.getById = jest.fn().mockImplementation((id: Number) => Promise.resolve(userModel));
        UserRepositoryService.prototype.deleteUser = jest.fn().mockImplementation(() => Promise.resolve(userModel.id));
        UserRepositoryService.prototype.getAutoSuggestUsers = jest.fn().mockImplementation(() => Promise.resolve([]));

        UserModel.findOneOrFail = jest.fn().mockImplementation((id: Number) => Promise.resolve(userModel));
        UserModel.update = jest.fn().mockImplementation(() => Promise.resolve(userModel.id));

        userService = new UserService(
            new UserRepositoryService(),
        );
    });

    it("validateUserDTO - positive scenario", async () => {
        const validateUserDTOSpy = spyOn(UserRepositoryService.prototype, "validateUserDTO");
        await userService.validateUserDTO(userMock);
        expect(validateUserDTOSpy).toBeCalled();
    });

    it("createUser", async () => {
        const createUserSpy = spyOn(UserRepositoryService.prototype, "createUser");
        const userId = await userService.createUser(userMock);
        expect(createUserSpy).toBeCalled();
        expect(userId).toBe(1);
    })

    it("getById", async () => {
        const getByIdSpy = spyOn(UserRepositoryService.prototype, "getById");
        const userId = await userService.getById(userModel.id);
        expect(getByIdSpy).toBeCalled();
        expect(userId).toBe(userId);
    })

    it("updateUser", async () => {
        const findOneOrFailSpy = spyOn(UserModel, "findOneOrFail");
        const updaterSpy = spyOn(UserModel, "update");
        const res = await userService.updateUser(userModel.id, userMock);
        expect(findOneOrFailSpy).toBeCalled();
        expect(updaterSpy).toBeCalled();
        expect(res).toBe(userModel.id);
    })

    it("deleteUser", async () => {
        const deleteUserSpy = spyOn(UserRepositoryService.prototype, "deleteUser");
        await userService.deleteUser(userModel.id)
        expect(deleteUserSpy).toBeCalled();
    })

    it("getAutoSuggestUsers", async () => {
        const getAutoSuggestUsersSpy = spyOn(UserRepositoryService.prototype, "getAutoSuggestUsers");
        await userService.getAutoSuggestUsers("", 10);
        expect(getAutoSuggestUsersSpy).toBeCalled();
    })

    it("getUserByNameAndPassword", async () => {
        const findOneOrFailSpy = spyOn(UserModel, "findOneOrFail");
        await userService.getUserByNameAndPassword("", "")
        expect(findOneOrFailSpy).toBeCalled();
    })
});