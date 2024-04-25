import { NextFunction, Request, Response } from "express";
import { ApiError } from "../utils/api-errors";
import { logger } from "../libs/Winston";

export const errorMiddleware = (
    error: Error & Partial<ApiError>,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const statusCode = error.statusCode ?? 500;
    const message = error.statusCode
        ? error.message
        : `Internal Server Error: ${error}`;

    logger.error(
        `Error API: PATH: ${req.path} - METHOD: ${req.method} - HOSTNAME: ${req.hostname} - MESSAGE: ${message}`
    );

    return res.status(statusCode).send({ message });
};
