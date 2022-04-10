import {
    Service,
} from "typedi";
import {
    Permission,
} from "./types";
import GroupModel from "../../models/GroupModel";

@Service()
export default class GroupService {
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
            const group = await this.getById(id);
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
}