import GroupModel from "../models/GroupModel";
import { Permission } from "./GroupService/types";
import { getManager } from "typeorm";
import UserModel from "../models/UserModel";
import { Service } from "typedi";

@Service()
export default class GroupRepositoryService {

    async getById(id: string) {
        return GroupModel.findOneOrFail(id);
    }

    async createGroup(name, permissions: Permission[]) {
        const group = await GroupModel.save(
            GroupModel.create({
                name,
                permissions,
            }),
        );

        return group.id;
    }

    async updateGroup(id: string, name: string, permissions: Permission[]) {
        const { ...group } = await this.getById(id);
        if (name) {
            group.name = name;
        }
        if (permissions && permissions.length > 0) {
            group.permissions = permissions;
        }
        await GroupModel.update(id, group);
        return id;
    }

    async deleteGroup(id: string) {
        await GroupModel.delete(id);
    }

    async addUsersToGroup(groupId: string, userIds: string[]) {
        await getManager().transaction(async transactionalEntityManager => {
            const group =
                await transactionalEntityManager.findOneOrFail(GroupModel, groupId);
            const users =
                await transactionalEntityManager.findByIds(UserModel, userIds, { relations: ["groups"] });
            users.forEach((user) => { user.groups.push(group) })
            await transactionalEntityManager.save(users);
        })
    }
}
