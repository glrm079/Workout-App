import { Request, Response } from "express";
import { routinesService } from "../services/routine.service";

export const routinesController = {
  createRoutine(req: Request, res: Response) {
    if (!req.body) {
      return res.status(400).json({ error: "Missing requisition body" });
    }

    const { userId, displayName, description } = req.body;

    if (!userId || !displayName || !description) {
      return res.status(400).json({ error: "Missing required informations" });
    }

    try {
      const result = routinesService.createRoutines(
        userId,
        displayName,
        description,
      );
      return res.status(201).json(result);
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  },

  getRoutine(req: Request, res: Response) {
    const { routineId, userId } = req.body;

    if (!userId) {
      return res.status(400).json({ error: "Missing user identification" });
    }

    try {
      const result = routinesService.getRoutines(userId, routineId);
      return res.status(201).json(result);
    } catch (error) {
      return res.status(400).json({ error: "No Data found for user" });
    }
  },

  deleteRoutine(req: Request, res: Response) {
    const { routineId, userId } = req.body;

    if (!userId) {
      return res.status(400).json({ error: "Missing user identification" });
    }
    if (!routineId) {
      return res.status(400).json({ error: "Missing routine identification" });
    }

    try {
      const result = routinesService.deleteRoutines(userId, routineId);
      return res.status(201).json(result);
    } catch (error) {
      return res.status(400).json({ error: "No Data found for user" });
    }
  },

  updateRoutine(req: Request, res: Response) {
    const { routineId, userId, displayName, description, enabled } = req.body;

    if (!userId) {
      return res.status(400).json({ error: "Missing user identification" });
    }
    if (!routineId) {
      return res.status(400).json({ error: "Missing routine identification" });
    }

    try {
      const result = routinesService.updateRoutines(
        userId,
        routineId,
        displayName,
        description,
        enabled,
      );
      return res.status(201).json(result);
    } catch (error) {
      return res.status(400).json({ error: "No Data found for user" });
    }
  },
};
