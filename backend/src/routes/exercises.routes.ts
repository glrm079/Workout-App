import { Router } from "express";
import { exerciseController } from "../controllers/exercise.controller";

const exercisesRoutes = Router();

exercisesRoutes.post("/createExercise", exerciseController.createExercise);
exercisesRoutes.get("/getExercise", exerciseController.getExercise);
exercisesRoutes.delete("/deleteExercise", exerciseController.deleteExercise);
exercisesRoutes.put("/updateExercise", exerciseController.updateExercise);

export default exercisesRoutes;
