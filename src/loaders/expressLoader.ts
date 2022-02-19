import { MicroframeworkSettings } from "microframework";
import express from "express";

import config from "../config";
import apiV1 from "../api";


export const expressLoader = (settings: MicroframeworkSettings) => {
    const app = express();

    app.use(express.json());
    app.use(config.api.v1.prefix, apiV1());

    app.all("/status", (req, res) => {
        res.end("ok");
    });

    app.listen(config.expressPort, () => {
        console.log(`Server listening on port: ${config.expressPort}`);
    });
    app.on("error", () => {
        process.exit(1);
    });

};
