import e, { Request, Response } from "express";
import { timelineService } from "../services/timeline.service";

export const timelineController = {
  createTimeline(req: Request, res: Response) {
    if (!req.body) {
      return res.status(400).json({ error: "Missing requisition body" });
    }

    const { userId, routineId, date, sets, exerciseId } = req.body;

    if (!userId || !routineId || !date || !sets || !exerciseId) {
      return res.status(400).json({ error: "Missing required informations" });
    }

    try {
      const result = timelineService.createTimeline(
        userId,
        routineId,
        date,
        sets,
        exerciseId,
      );
      return res.status(201).json(result);
    } catch (error: unknown) {
      return res.status(500).json({ error: (error as Error).message });
    }
  },

  getTimeline(req: Request, res: Response) {
    const { timelineId, userId, routineId, exerciseId } = req.body;

    if (!userId) {
      return res.status(400).json({ error: "Missing user identification" });
    }

    try {
      const result = timelineService.getTimeline(
        userId,
        timelineId,
        routineId,
        exerciseId,
      );
      return res.status(201).json(result);
    } catch (error) {
      return res.status(400).json({ error: "No Data found for user" });
    }
  },

  deleteTimeline(req: Request, res: Response) {
    const { timelineId, userId } = req.body;

    if (!userId) {
      return res.status(400).json({ error: "Missing user identification" });
    }
    if (!timelineId) {
      return res.status(400).json({ error: "Missing timeline identification" });
    }

    try {
      const result = timelineService.deleteTimeline(userId, timelineId);
      return res.status(201).json(result);
    } catch (error) {
      return res.status(400).json({ error: "No Data found for user" });
    }
  },

  updateTimeline(req: Request, res: Response) {
    const { timelineId, userId, date, sets } = req.body;

    if (!userId) {
      return res.status(400).json({ error: "Missing user identification" });
    }
    if (!timelineId) {
      return res.status(400).json({ error: "Missing timeline identification" });
    }

    try {
      const result = timelineService.updateTimeline(
        userId,
        timelineId,
        date,
        sets,
      );
      return res.status(201).json(result);
    } catch (error) {
      return res.status(400).json({ error: "No Data found for user" });
    }
  },
};
