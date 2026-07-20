import { Exercise } from "../../@types/index";
import { db } from "../database/connection";

export const exerciseRepository = {
  async save(exercise: Exercise): Promise<Exercise> {
    db.query(
      `
    INSERT INTO exercises
   (exercise_id,routine_id,category_id,display_name,description,user_id,created_at,updated_at)
    VALUES ($1, $2, $3, $4, $5, $6,$7,$8)
    `,
      [
        exercise.exerciseId,
        exercise.routineIds,
        exercise.categoryIds,
        exercise.displayName,
        exercise.description,
        exercise.userId,
        exercise.createdAt,
        exercise.updatedAt,
      ],
    );
    return exercise;
  },

  async get(userId: string): Promise<Exercise> {
    const result = await db.query(
      `
      SELECT * FROM exercises WHERE user_id = $1
      `,
      [userId],
    );
    return result.rows[0];
  },

  async getById(userId: string, exerciseId: string): Promise<Exercise> {
    const result = await db.query(
      `
      SELECT * FROM exercises WHERE user_id = $1 AND exercise_id = $2
      `,
      [userId, exerciseId],
    );
    return result.rows[0];
  },

  async getRoutineId(userId: string, routineId: string): Promise<Exercise> {
    const result = await db.query(
      `
      SELECT * FROM exercises WHERE user_id = $1 AND routine_id = $2
      `,
      [userId, routineId],
    );
    return result.rows[0];
  },

  async getByCategoryId(userId: string, categoryId: string): Promise<Exercise> {
    const result = await db.query(
      `
      SELECT * FROM exercises WHERE user_id = $1 AND category_id = $2
      `,
      [userId, categoryId],
    );
    return result.rows[0];
  },

  async delete(userId: string, exerciseId: string) {
    const result = await db.query(
      `
      DELETE FROM exercises WHERE user_id = $1 AND exercise_id = $2
      `,
      [userId, exerciseId],
    );
    return result.rows[0];
  },

  async update(
    userId: string,
    exerciseId: string,
    displayName: string,
    description: string,
    routineIds: string[],
    categoryIds: string[],
    updatedAt: string[]
  ) {
   const result = await db.query(
      `
      UPDATE categories
      SET display_name = $1, description = $2, updated_at = $3
      WHERE user_id = $4 AND exercise_id = $5 AND routine_id = $6
      `,
      [],
    );
    return result.rows[0];
  },
};
