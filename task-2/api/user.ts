import {
    IRouter,
} from "express";
import {
    RequestHandler,
} from "express-serve-static-core";
import * as Joi from 'joi'
import * as uuid from "uuid";

import {
    User,
} from "../types";

import {
    ContainerTypes,
    ValidatedRequest,
    ValidatedRequestSchema,
    createValidator
} from 'express-joi-validation';


const validator = createValidator()

const CreateUserSchema = Joi.object({
    login: Joi.string().required(),
    password: Joi.string().alphanum().required(),
    age: Joi.number().min(4).max(130).required()
})

interface CreateUserRequestSchema extends ValidatedRequestSchema {
    [ContainerTypes.Query]: {
        login: string
        password: string
        age: number
    }
}

const UpdateUserSchema = Joi.object({
    login: Joi.string(),
    password: Joi.string().alphanum(),
    age: Joi.number().min(4).max(130),
})

interface UpdateUserRequestSchema extends ValidatedRequestSchema {
    [ContainerTypes.Query]: {
        login: string
        password: string
        age: number
    }
}

const validateUser: RequestHandler = (req, res, next) => {
    if (res.locals.user === undefined) {
        res.status(404).json({ message: `User with id ${req.params.id} not found.` });
        return;
    }

    next();
}

export default (router: IRouter, usersStorage: Array<User>) => {
    router.param("id", (req, res, next, id) => {
        const user = Object.assign({}, usersStorage.find((user) => user.id === id && user.isDeleted === false));
        delete user.isDeleted;
        res.locals.user = user;
        next();
    });

    router.get("/:id", validateUser, (req, res) => {
        res.locals.user ?
            res.json({ body: res.locals.user, message: "ok" }) :
            res.status(404).json({ message: "User not found" });
    });

    router.post("/", validator.body(CreateUserSchema), (req: ValidatedRequest<CreateUserRequestSchema>, res) => {
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

    router.put("/:id", validateUser, validator.body(UpdateUserSchema), (req: ValidatedRequest<UpdateUserRequestSchema>, res) => {
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
