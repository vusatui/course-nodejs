import {
    Router,
} from "express";
import { Container } from "typedi";

import validateUserDTO from "../middlewares/validateUserDTO";
import UserService from "../../services/UserService";
import logRequest from "../middlewares/logRequest";
import validateToken from "../middlewares/validateToken";

const userRouter = Router();
const userService = Container.get(UserService);

userRouter.post("/", logRequest(), validateToken(), validateUserDTO(), async (req, res) => {
    const id = await userService.createUser(req.body);

    res.json({ result: { id }, message: "ok" });
});


userRouter.get("/getAutoSuggestUsers", logRequest(), async (req, res) => {
    try {
        const {
            loginSubstring,
            limit,
        } = req.body;

        const users = await userService.getAutoSuggestUsers(loginSubstring, limit);

        res.json({ result: { users }, message: "ok" });
    } catch(error) {
        res.status(400).json({ error: { message: error.message } });
    }
});

userRouter.get("/:id", logRequest(), async (req, res) => {
    try {
        const user = await userService.getById(Number(req.params.id));

        res.json({ result: { user }, message: "ok" });
    } catch(error) {
        res.status(400).json({ error: { message: error.message } });
    }
});

userRouter.put("/:id", logRequest(), validateUserDTO(), async (req, res) => {
    try {
        const id = await userService.updateUser(Number(req.params.id), req.body);

        res.json({result: { id }, message: "ok"});
    } catch (error) {
        res.status(400).json({error: { message: error.message }});
    }
});

userRouter.delete("/:id", logRequest(), async (req, res) => {
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
