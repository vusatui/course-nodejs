import { Router } from "express";
import { Container } from "typedi";
import GroupService from "../../services/GroupService";

const groupRouter = Router();
const groupService = Container.get(GroupService);

const handlerWrapper = fn =>
    function asyncUtilWrap(...args) {
        const fnReturn = fn(...args)
        const next = args[args.length - 1]
        return Promise.resolve(fnReturn).catch(next)
    }

groupRouter.post("/", handlerWrapper(async (req, res) => {
    const {
        name,
        permissions,
    } = req.body;

    const id = await groupService.createGroup(name, permissions);
    res.json({ result: { id } });
}));

groupRouter.post("/addUsersToGroup", handlerWrapper(async (req, res) => {
    const {
        groupId,
        userIds,
    } = req.body;

    await groupService.addUsersToGroup(groupId, userIds);
    res.end();
}));

groupRouter.get("/:id", handlerWrapper(async (req, res) => {
    res.json({ result: { group: await groupService.getById(req.params.id) } });
}));

groupRouter.put("/:id", handlerWrapper(async (req, res) => {
    const {
        name,
        permissions,
    } = req.body;

    const id = await groupService.updateGroup(req.params.id, name, permissions);

    res.json({ result: { id } });
}));

groupRouter.delete("/:id", handlerWrapper(async (req, res) => {
    await groupService.deleteGroup(req.params.id);
    res.end();
}));

export default (router: Router) => {
    router.use("/group", groupRouter);
};
