import {
    Request,
    Response,
} from "express";
import { Container } from "typedi";
import { Logger } from "winston";


export default () => (req: Request, res: Response, next) => {
    const logger: Logger = Container.get("logger");
    let message = `Method: ${req.method}. Endpoint: ${req.path}.`;

    const args = Object.entries(req.params);
    if (args.length > 0) {
        message += ` Args: ${args.map((entry: string[]) => entry.join(": ")).join(", ")}`;
    }

    logger.info(message);

    next();
};
