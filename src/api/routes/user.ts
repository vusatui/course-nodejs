import {
    Router,
} from "express";

import validateUserDTO from "../middlewares/validateUserDTO";
import UserService from "../../services/UserService";
import validateToken from "../middlewares/validateToken";

export default (router: Router, userService: UserService) => {
    const userRouter = Router();

    userRouter.post("/", validateToken(), validateUserDTO(), async (req, res) => {
        const id = await userService.createUser(req.body);

        res.json({ result: { id } });
    });


    userRouter.get("/getAutoSuggestUsers", async (req, res) => {
        try {
            const {
                loginSubstring,
                limit,
            } = req.body;

            const users = await userService.getAutoSuggestUsers(loginSubstring, limit);

            res.json({ result: { users } });
        } catch(error) {
            res.status(400).json({ error: { message: error.message } });
        }
    });

    userRouter.get("/:id", async (req, res) => {
        try {
            const user = await userService.getById(Number(req.params.id));

            res.json({ result: { user } });
        } catch(error) {
            res.status(400).json({ error: { message: error.message } });
        }
    });

    userRouter.put("/:id", validateToken(), validateUserDTO(), async (req, res) => {
        try {
            const id = await userService.updateUser(Number(req.params.id), req.body);

            res.json({result: { id }});
        } catch (error) {
            res.status(400).json({error: { message: error.message }});
        }
    });

    userRouter.delete("/:id", validateToken(), async (req, res) => {
        try {
            const id = await userService.deleteUser(Number(req.params.id));

            res.json({ result: { id }});
        } catch (error) {
            res.status(400).json({ error: { message: error.message }});
        }
    });

  router.use("/user", userRouter);
};
