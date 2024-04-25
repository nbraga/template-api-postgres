import { Request, Response } from "express";
import UserService from "../services/UserService";

class UserController {
    async index(req: Request, res: Response) {
        const userId = req.userId;
        const result = await UserService.index(userId);

        return res.status(result.status.code).send(result);
    }

    async create(req: Request, res: Response) {
        const objectUser = req.body;

        const result = await UserService.create(objectUser);

        return res.status(201).send(result);
    }

    async remove(req: Request, res: Response) {
        const userId = req.query;
        const result = await UserService.index(String(userId));

        return res.status(result.status.code).send(result);
    }
}

export default new UserController();
