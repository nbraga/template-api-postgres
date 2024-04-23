import { Request, Response } from "express";
import LoginService from "../services/LoginService";

class LoginController {
    async create(req: Request, res: Response) {
        const { email, password } = req.body;

        const result = await LoginService.create(email, password);

        return res.status(200).send(result);
    }
}

export default new LoginController();
