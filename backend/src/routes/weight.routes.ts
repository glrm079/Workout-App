import { Router } from "express";
import { weightController } from "../controllers/weight.controller";

const weightRoutes = Router();

weightRoutes.post("/createWeight", weightController.createWeight);
weightRoutes.get("/getWeight", weightController.getWeight);

export default weightRoutes;
