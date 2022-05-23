import { Router } from "express";
import { Container } from "typedi";
import jwt from "jsonwebtoken";

import UserService from "../../services/UserService";
import { BadRequestError } from "../../errors/BadRequestError";
import { NotFoundError } from "../../errors/NotFoundError";


const authRouter = Router();
const userService = Container.get(UserService);

authRouter.get("/login", async (req, res, next) => {
    const {
        login,
        password,
    } = req.body;

    if (!login || !password) {
        next(new BadRequestError());
    }

    try {
        const user = await userService.getUserByNameAndPassword(login, password)
        const token = jwt.sign({ id: user.id, groups: user.groups }, process.env.JWT_SEED_PHRASE, { expiresIn: "2m" });

        res.json({ token });
    } catch (e) {
        next(new NotFoundError());
    }
});

export default (router: Router) => {
    router.use("/auth", authRouter);
};