import express from "express";
import {Logger} from "winston";
import morgan from "morgan";
import cors from "cors";

import config from "../config";
import apiV1 from "./router";

import logRequest from "./middlewares/logRequest";
import {BadRequestError} from "../errors/BadRequestError";
import {NotFoundError} from "../errors/NotFoundError";
import {UnauthorizedError} from "../errors/UnauthorizedError";
import {ForbiddenError} from "../errors/ForbiddenError";


export default (logger: Logger) => {
  const app = express();

  app.use(express.json());
  app.use((req, res, next) => {
    const timer = logger.startTimer();

    res.on("close", () => {
      timer.done({ path: req.originalUrl });
    })
    res.on("error", () => {
      timer.done({ path: req.originalUrl });
    })


    next();
  });
  app.use(config.api.v1.prefix, apiV1());
  app.use(logRequest);
  app.use(morgan('combined'));


  app.options('*', cors())

  app.all(
      "/status",
      (req, res) => res.end("ok"),
  );

  app.use(async (err, req, res, next) => {
    let status = 500;
    let message = "Server Error";

    if (err instanceof BadRequestError) {
      status = 400;
      message = err.message;
    } else
    if (err instanceof NotFoundError) {
      status = 404;
      message = err.message;
    } else
    if (err instanceof UnauthorizedError) {
      status = 401;
      message = err.message;
    } else
    if (err instanceof ForbiddenError) {
      status = 403;
      message = err.message;
    }


    res.status(status).json({ message });
  });

  return app;
}
