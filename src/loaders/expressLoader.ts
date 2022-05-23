import config from "../config";
import app from "../api";
import {Container} from "typedi";

export const expressLoader = () => {
    app(Container.get("logger")).listen(config.expressPort, () => console.log(`Server listening on port: ${config.expressPort}`))
        .on("error", (err) => console.error(err.message));
};
