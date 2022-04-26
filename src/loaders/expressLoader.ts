import express from "express";
import { Container } from "typedi";
import { Logger } from "winston";
import cors from "cors";

import config from "../config";
import apiV1 from "../api";
import logRequest from "../api/middlewares/logRequest";
import { BadRequestError } from "../errors/BadRequestError";
import { NotFoundError } from "../errors/NotFoundError";
import { UnauthorizedError } from "../errors/UnauthorizedError";
import { ForbiddenError } from "../errors/ForbiddenError";


export const expressLoader = () => {
    const app = express();
    const logger: Logger = Container.get("logger");

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


    app.options('*', cors())

    app.all("/status",
        logRequest(),
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

    app.listen(config.expressPort, () => console.log(`Server listening on port: ${config.expressPort}`))
        .on("error", (err) => console.error(err.message));
};
