import {
    Service,
} from "typedi";
import {
    Permission,
} from "./types";
import GroupRepositoryService from "../GroupRepositoryService";

@Service()
export default class GroupService {

    constructor(
        private groupRepositoryService: GroupRepositoryService,
    ) {}

    async getById(id: string) {
        return this.groupRepositoryService.getById(id);
    }

    async createGroup(name, permissions: Permission[]) {
       return this.groupRepositoryService.createGroup(name, permissions);
    }

    async updateGroup(id: string, name: string, permissions: Permission[]) {
        return this.groupRepositoryService.updateGroup(id, name, permissions);
    }

    async deleteGroup(id: string) {
        await this.groupRepositoryService.deleteGroup(id);
    }

    async addUsersToGroup(groupId: string, userIds: string[]) {
        await this.groupRepositoryService.addUsersToGroup(groupId, userIds);
    }
}