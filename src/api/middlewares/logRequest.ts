import {
    Request,
    Response,
} from "express";
import { Container } from "typedi";
import { Logger } from "winston";


export default () => (req: Request, res: Response, next) => {
    const logger: Logger = Container.get("logger");
    logger.info(
        'Request received',
        { method: req.method, url: req.url, params: req.params, body: req.body }
    );

    next();
};
