import { Request, Response } from "express";
import AdminService from "../services/AdminService";

class AdminController {
    async create(req: Request, res: Response) {
        const result = await AdminService.create();

        return res.status(201).send(result);
    }
}

export default new AdminController();
