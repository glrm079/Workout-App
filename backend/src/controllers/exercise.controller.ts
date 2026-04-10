import { Request, Response } from "express";
import { exerciseService } from "../services/exercise.service";

export const exerciseController = {
  createExercise(req: Request, res: Response) {
    if (!req.body) {
      return res.status(400).json({ error: "Missing requisition body" });
    }

    const { userId, description, displayName, routineIds, categoryIds } =
      req.body;

    if (!userId || !displayName || !description || !routineIds) {
      return res.status(400).json({ error: "Missing required informations" });
    }

    try {
      const result = exerciseService.createExercise(
        userId,
        displayName,
        description,
        routineIds,
        categoryIds,
      );
      return res.status(201).json(result);
    } catch (error: unknown) {
      return res.status(500).json({ error: (error as Error).message });
    }
  },

  getExercise(req: Request, res: Response) {
    const { exerciseId, userId, routineId, categoryId } = req.body;

    if (!userId) {
      return res.status(400).json({ error: "Missing user identification" });
    }

    try {
      const result = exerciseService.getExercises(
        userId,
        exerciseId,
        routineId,
        categoryId,
      );
      return res.status(201).json(result);
    } catch (error) {
      return res.status(400).json({ error: "No Data found for user" });
    }
  },

  deleteExercise(req: Request, res: Response) {
    const { exerciseId, userId } = req.body;

    if (!userId) {
      return res.status(400).json({ error: "Missing user identification" });
    }
    if (!exerciseId) {
      return res.status(400).json({ error: "Missing exercise identification" });
    }

    try {
      const result = exerciseService.deleteExercises(userId, exerciseId);
      return res.status(201).json(result);
    } catch (error) {
      return res.status(400).json({ error: "No Data found for user" });
    }
  },

  updateExercise(req: Request, res: Response) {
    const {
      exerciseId,
      userId,
      displayName,
      description,
      routineIds,
      categoryIds,
    } = req.body;

    if (!userId) {
      return res.status(400).json({ error: "Missing user identification" });
    }
    if (!exerciseId) {
      return res.status(400).json({ error: "Missing exercise identification" });
    }

    try {
      const result = exerciseService.updateExercises(
        userId,
        exerciseId,
        displayName,
        description,
        routineIds,
        categoryIds,
      );
      return res.status(201).json(result);
    } catch (error) {
      return res.status(400).json({ error: "No Data found for user" });
    }
  },
};
