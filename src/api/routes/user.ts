import {
    Router,
} from "express";
import { Container } from "typedi";

import validateUserDTO from "../middlewares/validateUserDTO";
import UserService from "../../services/UserService";

const userRouter = Router();
const userService = Container.get(UserService);

userRouter.post("/", validateUserDTO(), async (req, res) => {
    const id = await userService.createUser(req.body);

    res.json({ result: { id }, message: "ok" });
});

userRouter.get("/:id", async (req, res) => {
    try {
        const user = await userService.getById(Number(req.params.id));

        res.json({ result: { user }, message: "ok" });
    } catch(error) {
        res.status(400).json({ error: { message: error.message } });
    }
})

userRouter.put("/:id", validateUserDTO(), async (req, res) => {
    try {
        const id = await userService.updateUser(Number(req.params.id), req.body);

        res.json({result: { id }, message: "ok"});
    } catch (error) {
        res.status(400).json({error: { message: error.message }});
    }
});

userRouter.delete("/:id", async (req, res) => {
    try {
        const id = await userService.deleteUser(Number(req.params.id));

        res.json({ result: { id }, message: "ok"});
    } catch (error) {
        res.status(400).json({ error: { message: error.message }});
    }
});

export default (router: Router) => {
  router.use("/user", userRouter);
};
