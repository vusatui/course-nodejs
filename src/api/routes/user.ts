import {
    Router,
} from "express";
import { Container } from "typedi";

import validateUserDTO from "../middlewares/validateUserDTO";
import checkIfUserExists from "../middlewares/checkIfUserExists";
import UserService from "../../services/UserService";

const userRouter = Router();
const userService = Container.get(UserService);

userRouter.post("/", validateUserDTO(), async (req, res) => {
    const id = await userService.createUser(req.body);

    res.json({ result: { id }, message: "ok" });
});

userRouter.get("/:id", checkIfUserExists(), (req, res) => {
    // TODO: send user info.
})

userRouter.put("/:id", checkIfUserExists(), validateUserDTO(), (req, res) => {
   // TODO: update user info.
});

userRouter.delete("/:id", checkIfUserExists(), (req, res) => {
   // TODO: softly remove the user.
});

export default (router: Router) => {
  router.use("/user", userRouter);
};
