import {
    Service,
} from "typedi";

import { User } from "./types";
import UserRepositoryService from "../UserRepositoryService";
import UserModel from "../../models/UserModel";


@Service()
export default class UserService {

    constructor(
        private userRepositoryService: UserRepositoryService,
    ) {}

    async validateUserDTO(userDTO: User) {
        await this.userRepositoryService.validateUserDTO(userDTO);
    }

    async createUser(userDTO: User) {
        return this.userRepositoryService.createUser(userDTO);
    }

    async getById(id: number) {
        return this.userRepositoryService.getById(id);
    }

    async updateUser(id: number, userDTO: User) {
        return this.userRepositoryService.updateUser(id, userDTO);
    }

    async deleteUser(id: number) {
        return this.userRepositoryService.deleteUser(id);
    }

    async getAutoSuggestUsers(loginSubstring: string, limit: number) {
        return this.userRepositoryService.getAutoSuggestUsers(loginSubstring, limit);
    }

    async getUserByNameAndPassword(login: string, password: string) {
        return UserModel.findOneOrFail({ where: { login, password }, relations: ["groups"] });
    }
}
