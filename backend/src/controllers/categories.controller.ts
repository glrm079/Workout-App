import { Request, Response } from "express";
import { categoriesService } from "../services/categories.service";

export interface Categories {
  categoryId: string;
  displayName: string;
  color: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export const categoriesController = {
  createCategory(req: Request, res: Response) {
    if (!req.body) {
      return res.status(400).json({ error: "Missing requisition body" });
    }

    const { userId, displayName, color } = req.body;

    if (!userId || !displayName || !color) {
      return res.status(400).json({ error: "Missing required informations" });
    }

    try {
      const result = categoriesService.createCategories(
        userId,
        displayName,
        color,
      );
      return res.status(201).json(result);
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  },

  getCategory(req: Request, res: Response) {
    const { categoryId, userId } = req.body;

    if (!userId) {
      return res.status(400).json({ error: "Missing user identification" });
    }

    try {
      const result = categoriesService.getCategories(userId, categoryId);
      return res.status(201).json(result);
    } catch (error) {
      return res.status(400).json({ error: "No Data found for user" });
    }
  },

  deleteCategory(req: Request, res: Response) {
    const { categoryId, userId } = req.body;

    if (!userId) {
      return res.status(400).json({ error: "Missing user identification" });
    }
    if (!categoryId) {
      return res.status(400).json({ error: "Missing weight identification" });
    }

    try {
      const result = categoriesService.deleteCategories(userId, categoryId);
      return res.status(201).json(result);
    } catch (error) {
      return res.status(400).json({ error: "No Data found for user" });
    }
  },

  updateCategory(req: Request, res: Response) {
    const { categoryId, userId, displayName, color } = req.body;

    if (!userId) {
      return res.status(400).json({ error: "Missing user identification" });
    }
    if (!categoryId) {
      return res.status(400).json({ error: "Missing category identification" });
    }

    try {
      const result = categoriesService.updateCategories(
        userId,
        categoryId,
        displayName,
        color,
      );
      return res.status(201).json(result);
    } catch (error) {
      return res.status(400).json({ error: "No Data found for user" });
    }
  },
};
