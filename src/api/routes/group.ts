import { Router } from "express";
import { Container } from "typedi";
import GroupService from "../../services/GroupService";

const groupRouter = Router();
const groupService = Container.get(GroupService);

const handler = async (cb: () => Promise<void>, res) => {
    try {
        await cb();
    } catch(error) {
        res.status(400).json({ error: { message: error.message } });
    }
}

groupRouter.post("/", async (req, res) => {
   await handler(async () => {
            const {
                name,
                permissions,
            } = req.body;

           const id = await groupService.createGroup(name, permissions);
           res.json({ result: { id }, message: "ok" });
       },
       res,
   );
});

groupRouter.get("/:id", async (req, res) => {
    await handler(async () => {
        const group = await groupService.getById(req.params.id);

        res.json({ result: { group }, message: "ok" });
    }, res);
});

groupRouter.put("/:id", async (req, res) => {
    await handler(async () => {
        const {
            name,
            permissions,
        } = req.body;

        const id = await groupService.updateGroup(req.params.id, name, permissions);

        res.json({ result: { id }, message: "ok" });
    }, res);
});

groupRouter.delete("/:id", async (req, res) => {
    await handler(async () => {
        await groupService.deleteGroup(req.params.id);
        res.json({ message: "ok" });
    }, res);
});

export default (router: Router) => {
    router.use("/group", groupRouter);
};
