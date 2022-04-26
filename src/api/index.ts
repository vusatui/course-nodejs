import { Router } from "express";

import userApi from "./routes/user";
import groupApi from "./routes/group";
import authApi from "./routes/auth";


export default () => {
  const router = Router();

  userApi(router);
  groupApi(router);
  authApi(router);

  return router;
};
