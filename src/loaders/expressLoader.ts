import express from "express";

import config from "../config";
import apiV1 from "../api";


export const expressLoader = () => {
    const app = express();

    app.use(express.json());
    app.use(config.api.v1.prefix, apiV1());

    app.all("/status",
        (req, res) => res.end("ok"));

    app.listen(config.expressPort, () => console.log(`Server listening on port: ${config.expressPort}`))
        .on("error", (err) => console.error(err.message));
};
