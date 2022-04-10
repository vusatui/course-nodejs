import {MigrationInterface, QueryRunner,} from "typeorm";
import { faker } from "@faker-js/faker";
import UserModel from "../models/UserModel";

export class UserRefactoring1645364875417 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        try {
            const users = [];
            for(let i = 0; i < 20; i++) {
                const user = UserModel.create({
                    login: faker.internet.userName(),
                    password: faker.internet.password(),
                    age: faker.datatype.number({ min: 4, max: 100 }),
                });
                users.push(user);
            }
            await UserModel.clear();
            await UserModel.save(users);
        } catch (e) {
            console.error(e.message);
        }

    }

    public async down(queryRunner: QueryRunner): Promise<void> {}

}
