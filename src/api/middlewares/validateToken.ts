import { RequestHandler } from "express";
import jwt from "jsonwebtoken";
import { UnauthorizedError } from "../../errors/UnauthorizedError";
import {ForbiddenError} from "../../errors/ForbiddenError";

const validateToken: () => RequestHandler = () => (req, res, next) => {
    const token = req.header("Authorization")?.split(" ")[1];

    if (!token) {
        next(new UnauthorizedError());
    } else {
        try {
            res.locals.userInfo = jwt.verify(token, process.env.JWT_SEED_PHRASE);
            next();
        } catch(err) {
            next(new ForbiddenError());
        }
    }
}

export default validateToken;