import {MigrationInterface, QueryRunner,} from "typeorm";
import { faker } from "@faker-js/faker";
import UserModel from "../models/UserModel";

export class UserRefactoring1645364875417 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const users = [];
        for(let i = 0; i < 20; i++) {
            const user = UserModel.create({
                login: faker.internet.userName(),
                password: faker.internet.password(),
                age: faker.datatype.number({ min: 4, max: 100 }),
            });
            console.log(user, " - user");
            users.push(user);
        }
        await queryRunner.clearTable("user_model");
        console.log(users);
        await UserModel.save(users);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {}

}
