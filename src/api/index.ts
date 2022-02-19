import { Router } from "express";

import userApi from "./routes/user";


export default () => {
  const router = Router();

  userApi(router);

  return router;
};
