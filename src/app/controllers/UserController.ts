import { Request, Response } from "express";
import UserService from "../services/UserService";

class UserController {
    async index(req: Request, res: Response) {
        const result = await UserService.index();

        return res.status(result.status.code).send(result);
    }

    async create(req: Request, res: Response) {
        const objectData = req.body;

        const result = await UserService.create(objectData);

        return res.status(201).send(result);
    }

    async refreshData(req: Request, res: Response) {
        const userId = req.userId;

        const result = await UserService.refreshData(userId);

        return res.status(result.status.code).send(result);
    }
}

export default new UserController();
