import { Router } from "express";

import userApi from "./routes/user";
import groupApi from "./routes/group";
import authApi from "./routes/auth";
import {Container} from "typedi";
import UserService from "../services/UserService";
import GroupService from "../services/GroupService";


export default () => {
    const router = Router();

    userApi(router, Container.get(UserService));
    groupApi(router, Container.get(GroupService));
    authApi(router);

    return router;
};
