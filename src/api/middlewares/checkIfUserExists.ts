import {
    Request,
    Response,
} from "express";


export default () => async (req: Request, res: Response, next) => {
    // TODO: проверить в базе данных и запихнуть его в "res.locals"
    // иначе вернуть 404.
    next();
};
