import {
    Request,
    Response,
} from "express";
import { Container } from "typedi";
import UserService from "../../services/UserService";

export default () => async (req: Request, res: Response, next) => {
    const userService = Container.get(UserService);

    try {
        await userService.validateUserDTO(req.body);
        next();
    } catch (error) {
        res.status(400).json({ error: { message: error.message } });
    }
};
