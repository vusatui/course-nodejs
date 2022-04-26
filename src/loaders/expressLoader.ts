import express from "express";
import { Container } from "typedi";
import { Logger } from "winston";

import config from "../config";
import apiV1 from "../api";
import logRequest from "../api/middlewares/logRequest";


export const expressLoader = () => {
    const app = express();
    const logger: Logger = Container.get("logger");

    app.use(express.json());
    app.use((req, res, next) => {
        const timer = logger.startTimer();

        res.on("close", () => {
            timer.done({ path: req.url });
        })

        next();
    });
    app.use(config.api.v1.prefix, apiV1());

    app.all("/status",
        logRequest(),
        (req, res) => res.end("ok"),
        );

    app.use(async (err, req, res, next) => {
        logger.error(err.stack);
        res.status(500).send('Server Error');
    });

    app.listen(config.expressPort, () => console.log(`Server listening on port: ${config.expressPort}`))
        .on("error", (err) => console.error(err.message));
};
