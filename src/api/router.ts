import { Router } from "express";

import userApi from "./routes/user";
import groupApi from "./routes/group";
import authApi from "./routes/auth";
import {Container} from "typedi";
import UserService from "../services/UserService";


export default () => {
    const router = Router();

    userApi(router, Container.get(UserService));
    groupApi(router);
    authApi(router);

    return router;
};
