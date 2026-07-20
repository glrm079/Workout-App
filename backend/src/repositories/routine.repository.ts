import type { Routine } from "../../@types/index";
import { db } from "../database/connection";

export const routineRepository = {
  async save(routine: Routine): Promise<Routine> {
    const result = await db.query(
      `
    INSERT INTO routines
    (routine_id, display_name, description, user_id, enabled, created_at, updated_at)
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    `,
      [
        routine.routineId,
        routine.displayName,
        routine.description,
        routine.userId,
        routine.enabled,
        routine.createdAt,
        routine.updatedAt,
      ],
    );
    return routine;
  },

  async get(userId: string): Promise<Routine[]> {
    const result = await db.query(
      `
      SELECT * FROM routines WHERE user_id = $1
      `,
      [userId],
    );
    return result.rows;
  },

  async getById(userId: string, routineId: string): Promise<Routine> {
    const result = await db.query(
      `
      SELECT * FROM routines WHERE user_id = $1 AND routine_id = $2
      `,
      [userId, routineId],
    );
    return result.rows[0];
  },

  async delete(userId: string, routineId: string): Promise<Routine> {
    const result = await db.query(
      `
      SELECT * FROM routines WHERE user_id = $1 AND routine_id = $2
      `,
      [userId, routineId],
    );
    return result.rows[0];
  },

  async update(
    userId: string,
    routineId: string,
    displayName: string,
    description: string,
    enabled: boolean,
  ): Promise<Routine> {
    const result = await db.query(
      `
      UPDATE routines
      SET display_name = $1, description = $2, enabled = $3, updated_at = $4
      WHERE user_id = $5 AND routine_id = $6
      `,
      [displayName, description, enabled, Date.now(), userId, routineId],
    );
    return result.rows[0];
  },
};
