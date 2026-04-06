import { Request, Response } from "express";
import { weightService } from "../services/weight.service";

export const weightController = {
  createWeight(req: Request, res: Response) {
    if (!req.body) {
      return res.status(400).json({ error: "Missing requisition body" });
    }

    const { userId, weight, date } = req.body;

    if (!userId || !weight || !date) {
      return res.status(400).json({ error: "Missing required informations" });
    }

    try {
      const result = weightService.createWeight(userId, weight, date);
      return res.status(201).json(result);
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  },

  getWeight(req: Request, res: Response) {
    const { weightId, userId } = req.body;

    if (!userId) {
      return res.status(400).json({ error: "Missing user identification" });
    }

    try {
      const result = weightService.getWeight(userId, weightId);
      return res.status(201).json(result);
    } catch (error) {
      return res.status(400).json({ error: "No Data found for user" });
    }
  },

  deleteWeight(req: Request, res: Response) {
    const { weightId, userId } = req.body;

    if (!userId) {
      return res.status(400).json({ error: "Missing user identification" });
    }
    if (!weightId) {
      return res.status(400).json({ error: "Missing weight identification" });
    }

    try {
      const result = weightService.deleteWeight(userId, weightId);
      return res.status(201).json(result);
    } catch (error) {
      return res.status(400).json({ error: "No Data found for user" });
    }
  },

  updateWeight(req: Request, res: Response) {
    const { weightId, userId, weight, date } = req.body;

    if (!userId) {
      return res.status(400).json({ error: "Missing user identification" });
    }
    if (!weightId) {
      return res.status(400).json({ error: "Missing weight identification" });
    }

    try {
      const result = weightService.updateWeight(userId, weightId, weight, date);
      return res.status(201).json(result);
    } catch (error) {
      return res.status(400).json({ error: "No Data found for user" });
    }
  },
};
