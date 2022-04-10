import { Router } from "express";

import userApi from "./routes/user";
import groupApi from "./routes/group";


export default () => {
  const router = Router();

  userApi(router);
  groupApi(router);

  return router;
};
