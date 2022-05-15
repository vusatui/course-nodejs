import { Router } from "express";
import GroupService from "../../services/GroupService";
import validateToken from "../middlewares/validateToken";


export default (router: Router, groupService: GroupService) => {
    const groupRouter = Router();

    const handlerWrapper = fn =>
        function asyncUtilWrap(...args) {
            const fnReturn = fn(...args)
            const next = args[args.length - 1]
            return Promise.resolve(fnReturn).catch(next)
        }

    groupRouter.post("/", validateToken(), handlerWrapper(async (req, res) => {
        const {
            name,
            permissions,
        } = req.body;

        const id = await groupService.createGroup(name, permissions);
        res.json({ result: { id } });
    }));

    groupRouter.post("/addUsersToGroup", validateToken(), handlerWrapper(async (req, res) => {
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

    groupRouter.put("/:id", validateToken(), handlerWrapper(async (req, res) => {
        const {
            name,
            permissions,
        } = req.body;

        const id = await groupService.updateGroup(req.params.id, name, permissions);

        res.json({ result: { id } });
    }));

    groupRouter.delete("/:id", validateToken(), handlerWrapper(async (req, res) => {
        await groupService.deleteGroup(req.params.id);
        res.end();
    }));

    router.use("/group", groupRouter);
};
