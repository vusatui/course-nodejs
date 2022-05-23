import GroupService from "../../src/services/GroupService";
import GroupRepositoryService from "../../src/services/GroupRepositoryService";
import spyOn = jest.spyOn;

describe("GroupService", () => {
    let groupService: GroupService | null;

    beforeAll(() => {
        GroupRepositoryService.prototype.getById = jest.fn();
        GroupRepositoryService.prototype.createGroup = jest.fn();
        GroupRepositoryService.prototype.updateGroup = jest.fn();
        GroupRepositoryService.prototype.deleteGroup = jest.fn();
        GroupRepositoryService.prototype.addUsersToGroup = jest.fn();

        groupService = new GroupService(
            new GroupRepositoryService(),
        );
    });

    it("getById", () => {
        const spy = spyOn(GroupRepositoryService.prototype, "getById");
        groupService.getById("1");
        expect(spy).toBeCalled();
    });

    it("createGroup", () => {
        const spy = spyOn(GroupRepositoryService.prototype, "createGroup");
        groupService.createGroup("Test Group", []);
        expect(spy).toBeCalled();
    });

    it("updateGroup", () => {
        const spy = spyOn(GroupRepositoryService.prototype, "createGroup");
        groupService.updateGroup("1", "Updated Test Name", []);
        expect(spy).toBeCalled();
    });

    it("deleteGroup", () => {
        const spy = spyOn(GroupRepositoryService.prototype, "deleteGroup");
        groupService.deleteGroup("1");
        expect(spy).toBeCalled();
    });

    it("addUsersToGroup", () => {
        const spy = spyOn(GroupRepositoryService.prototype, "addUsersToGroup");
        groupService.addUsersToGroup("1", ["1"]);
        expect(spy).toBeCalled();
    });
});
