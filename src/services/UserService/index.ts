import {
    Service,
} from "typedi";

import UserSchema from "./UserSchema";
import { User } from "./types";
import UserModel from "../../models/UserModel";
import { FindManyOptions } from "typeorm/find-options/FindManyOptions";
import {Like} from "typeorm";


@Service()
export default class UserService {
    async validateUserDTO(userDTO: User) {
        await UserSchema.validateAsync(userDTO, { abortEarly: false });
    }

    async createUser(userDTO: User) {
       const user = await UserModel.save(
           UserModel.create(userDTO)
       );

       return user.id;
    }

    async getById(id: number) {
        return UserModel.findOneOrFail(id);
    }

    async updateUser(id: number, userDTO: User) {
        const user = await UserModel.findOneOrFail(id);
        user.login = userDTO.login;
        user.password = userDTO.password;
        user.age = userDTO.age;
        await UserModel.update(user.id, user);
        return user.id;
    }

    async deleteUser(id: number) {
        const user = await UserModel.findOneOrFail(id);
        user.isDeleted = true;
        await UserModel.update(user.id, user);
        return user.id;
    }

    async getAutoSuggestUsers(loginSubstring: string, limit: number) {
        const options: FindManyOptions<UserModel> = {
            take: limit || 100,
            where: {
                login: Like(`%${loginSubstring.trim()}%`),
            },
        };

        return UserModel.find(options);
    }
}
