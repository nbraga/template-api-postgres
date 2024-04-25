import { Router } from "express";
import AdminController from "../app/controllers/AdminController";

const adminRoutes = Router();

adminRoutes.get("/create", AdminController.create);

export { adminRoutes };
