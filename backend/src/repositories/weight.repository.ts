import type { Weight } from "../../@types/index";
import { db } from "../database/connection";

export const weightRepository = {
  async save(weight: Weight): Promise<Weight> {
    const result = await db.query(
      `
      INSERT INTO weights (weight_id, user_id, weight, date, created_at, updated_at)
      VALUES ($1, $2, $3, $4, $5, $6)
      `,
      [
        weight.weightId,
        weight.userId,
        weight.weight,
        weight.date,
        weight.createdAt,
        weight.updatedAt,
      ],
    );
    return weight;
  },
  async get(userId: string) {
    const result = await db.query(
      `
      SELECT * FROM weights WHERE user_id = $1
      `,
      [userId],
    );
    return result.rows;
  },
  async getById(userId: string, weightId: string) {
    const result = await db.query(
      `
      SELECT * FROM weights WHERE user_id = $1 AND weight_id = $2
      `,
      [userId, weightId],
    );
    return result.rows[0];
  },
  async delete(userId: string, weightId: string) {
    const result = await db.query(
      `
      DELETE FROM weights WHERE user_id = $1 AND weight_id = $2
      `,
      [userId, weightId],
    );
  },
  async update(userId: string, weightId: string, weight: number, date: string) {
    const result = await db.query(
      `
      UPDATE weights
      SET weight = $1, date = $2, updated_at = $3
      WHERE user_id = $4 AND weight_id = $5
      `,
      [weight, date, Date.now(), userId, weightId],
    );
  },
};
