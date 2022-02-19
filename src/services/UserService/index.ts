import {
    Service,
} from "typedi";

import UserSchema from "./UserSchema";
import { User } from "./types";
import UserModel from "../../models/UserModel";


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
}
