import {
    IRouter,
} from "express";
import {
    RequestHandler,
} from "express-serve-static-core";
import * as uuid from "uuid";

import {
    User,
} from "../types";


const validateUser: RequestHandler = (req, res, next) => {
    if (res.locals.user === undefined) {
        res.status(404).json({ message: `User with id ${req.params.id} not found.` });
        return;
    }

    next();
}

export default (router: IRouter, usersStorage: Array<User>) => {
    router.param("id", (req, res, next, id) => {
        res.locals.user = usersStorage.find((user) => user.id === id);
        next();
    });

    router.get("/:id", validateUser, (req, res) => {
        res.json({ body: res.locals.user, message: "ok" });
    });

    router.post("/", (req, res) => {
        const { login, password, age } = req.body;
        const newUser: User = {
            id: uuid.v4(),
            login,
            password,
            age,
            isDeleted: false,
        };
        usersStorage.push(newUser);
        res.json({ body: { id: newUser.id }, message: "ok" });
    });

    router.put("/:id", validateUser, (req, res) => {
        const user: User = res.locals.user;

        const {
            login,
            password,
            age,
        } = req.body;

        if (login) {
            user.login = login;
        }

        if (password) {
            user.password = password;
        }

        if (age) {
            user.age = age;
        }

        res.json({ body: { id: user.id }, message: "ok" });
    });

    router.delete("/:id", validateUser, (req, res) => {
        const user: User = res.locals.user;
        user.isDeleted = true;
        res.json({ body: { id: user.id }, message: "ok" });
    });
};
