import {
    Service,
} from "typedi";

import { User } from "./types";
import UserRepositoryService from "../UserRepositoryService";


@Service()
export default class UserService {

    constructor(
        private userRepositoryService: UserRepositoryService,
    ) {}

    async validateUserDTO(userDTO: User) {
        await this.userRepositoryService.validateUserDTO(userDTO);
    }

    async createUser(userDTO: User) {
       await this.userRepositoryService.createUser(userDTO);
    }

    async getById(id: number) {
        await this.userRepositoryService.getById(id);
    }

    async updateUser(id: number, userDTO: User) {
        await this.userRepositoryService.updateUser(id, userDTO);
    }

    async deleteUser(id: number) {
        await this.userRepositoryService.deleteUser(id);
    }

    async getAutoSuggestUsers(loginSubstring: string, limit: number) {
        await this.userRepositoryService.getAutoSuggestUsers(loginSubstring, limit);
    }
}
