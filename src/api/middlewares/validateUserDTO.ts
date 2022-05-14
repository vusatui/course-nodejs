import {
    Request,
    Response,
} from "express";
import { Container } from "typedi";
import UserService from "../../services/UserService";


const userService = Container.get(UserService);

export default () => async (req: Request, res: Response, next) => {
    try {
        await userService.validateUserDTO(req.body);
        next();
    } catch (error) {
        res.status(400).json({ error: { message: error.message } });
    }
};
