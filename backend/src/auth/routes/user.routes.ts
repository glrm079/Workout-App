import { Router } from "express";
import { UserController } from "../controlers/user.controller";
const userRoutes = Router();

userRoutes.post("/createUser", UserController.createUser);
userRoutes.get("/signin", UserController.signinUser);

export default userRoutes;
