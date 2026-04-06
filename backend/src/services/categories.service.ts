import { v4 as uuidv4 } from "uuid";
import { Categories } from "../../@types/index";
import { categoriesRepository } from "../repositories/categories.repository";

export const categoriesService = {
  createCategories(
    userId: string,
    displayName: string,
    color: string,
  ): Categories {
    const newCategory: Categories = {
      categoryId: uuidv4(),
      userId,
      displayName,
      color,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    return categoriesRepository.save(newCategory);
  },
  getCategories(userId: string, categoryId: string) {
    if (categoryId) {
      return categoriesRepository.getById(userId, categoryId);
    }
    return categoriesRepository.get(userId);
  },

  deleteCategories(userId: string, categoryId: string) {
    {
      return categoriesRepository.delete(userId, categoryId);
    }
  },

  updateCategories(
    userId: string,
    categoryId: string,
    displayName: string,
    color: string,
  ) {
    const categoryToUpdate = categoriesRepository.getById(userId, categoryId);

    if (!categoryToUpdate) {
      throw new Error("Category not found");
    }
    return categoriesRepository.update(userId, categoryId, displayName, color);
  },
};
