import { Router } from "express";
import { weightController } from "../controllers/weight.controller";

const router = Router();

router.post("/createWeight", weightController.createWeight);

export default router;
