import { Router } from "express";
import UserController from "../app/controllers/UserController";
import { isAuthenticated } from "../middlewares/isAuthenticated";

const userRoutes = Router();

userRoutes.get("/", isAuthenticated, UserController.index);
userRoutes.post("/", isAuthenticated, UserController.create);
userRoutes.delete("/:userId", isAuthenticated, UserController.remove);

export { userRoutes };
