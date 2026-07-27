import type { Categories } from "../../@types/index";
import { db } from "../database/connection";

export const categoriesRepository = {
  async save(category: Categories): Promise<Categories> {
    const result = await db.query(
      `
  INSERT INTO categories
  (category_id, display_name, color, user_id, created_at, updated_at)
  VALUES ($1, $2, $3, $4, $5, $6)
  `,
      [
        category.categoryId,
        category.displayName,
        category.color,
        category.userId,
        category.createdAt,
        category.updatedAt,
      ],
    );
    return result.rows[0];
  },

  async get(userId: string): Promise<Categories[]> {
    const result = await db.query(
      `
      SELECT * FROM categories WHERE user_id = $1
      `,
      [userId],
    );
    return result.rows;
  },

  async getById(userId: string, categoryId: string): Promise<Categories> {
    const result = await db.query(
      `
      SELECT * FROM categories WHERE user_id = $1 AND category_id = $2
      `,
      [userId, categoryId],
    );
    return result.rows[0];
  },

  async delete(userId: string, categoryId: string): Promise<Categories> {
    const result = await db.query(
      `
      DELETE FROM categories WHERE user_id = $1 AND category_id = $2
      `,
      [userId, categoryId],
    );
    return result.rows[0];
  },

  async update(
    userId: string,
    categoryId: string,
    displayName: string,
    color: string,
  ): Promise<Categories> {
    const result = await db.query(
      `
      UPDATE categories
      SET display_name = $1, color = $2, updated_at = $3
      WHERE user_id = $4 AND category_id = $5
      `,
      [displayName, color, Date.now(), userId, categoryId],
    );
    return result.rows[0];
  },
};
