import { Router } from "express";
import { weightController } from "../controllers/weight.controller";

const weightRoutes = Router();

weightRoutes.post("/createWeight", weightController.createWeight);
weightRoutes.get("/getWeight", weightController.getWeight);
weightRoutes.delete("/deleteWeight", weightController.deleteWeight);
weightRoutes.put("/updateWeight", weightController.updateWeight);


export default weightRoutes;
