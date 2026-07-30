import { Router } from "express";
import { UserController } from "../controlers/user.controller";
const userRoutes = Router();

userRoutes.post("/createUser", UserController.createUser);

export default userRoutes;
