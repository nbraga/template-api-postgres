import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import { logger } from "../libs/Winston";

interface Payload {
    id: string;
    email: string;
}

export function isAuthenticated(
    request: Request,
    response: Response,
    next: NextFunction
) {
    const authToken = request.headers.authorization;

    if (!authToken) {
        return response.status(401).end();
    }

    const [, token] = authToken.split(" ");

    try {
        const { id, email } = verify(token, process.env.JWT_SECRET) as Payload;

        request.userId = id;
        request.userEmail = email;

        return next();
    } catch (err) {
        logger.error(err);
        return response.status(401).end();
    }
}
