import { Router } from "express";
import { routinesController } from "../controllers/routine.controller";

const routinesRoutes = Router();

routinesRoutes.post("/createRoutine", routinesController.createRoutine);
routinesRoutes.get("/getRoutine", routinesController.getRoutine);
routinesRoutes.delete("/deleteRoutine", routinesController.deleteRoutine);
routinesRoutes.put("/updateRoutine", routinesController.updateRoutine);

export default routinesRoutes;
