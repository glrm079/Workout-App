import type { Timeline, WorkoutSet } from "../../@types/index";
import { db } from "../database/connection";

export const timelineRepository = {
  async save(timeline: Timeline): Promise<Timeline> {
    const result = await db.query(
      `
    INSERT INTO timelines
    (timeline_id, user_id, date, sets, created_at, updated_at)
    VALUES ($1, $2, $3, $4, $5, $6)
    `,
      [
        timeline.timelineId,
        timeline.userId,
        timeline.date,
        timeline.sets,
        timeline.createdAt,
        timeline.updatedAt,
      ],
    );
    return timeline;
  },

  async get(userId: string) {
    const result = await db.query(
      `
      SELECT * FROM timelines WHERE user_id = $1
      `,
      [userId],
    );
    return result.rows;
  },

  async getById(userId: string, timelineId: string) {
    const result = await db.query(
      `
      SELECT * FROM timelines WHERE user_id = $1 AND timeline_id = $2
      `,
      [userId, timelineId],
    );
    return result.rows[0];
  },

  async getByRoutineId(userId: string, routineId: string) {
    const result = await db.query(
      `
      SELECT * FROM timelines WHERE user_id = $1 AND routine_id = $2
      `,
      [userId, routineId],
    );
    return result.rows;
  },

  async getByExerciseId(userId: string, exerciseId: string) {
    const result = await db.query(
      `
      SELECT * FROM timelines WHERE user_id = $1 AND exercise_id = $2
      `,
      [userId, exerciseId],
    );
    return result.rows;
  },

  async delete(userId: string, timelineId: string) {
    const result = await db.query(
      `
      DELETE FROM timelines WHERE user_id = $1 AND timeline_id = $2
      `,
      [userId, timelineId],
    );
  },

  async update(
    userId: string,
    timelineId: string,
    date: string,
    sets: WorkoutSet[],
  ) {
    const result = await db.query(
      `
      UPDATE timelines
      SET date = $1, sets = $2, updated_at = $3
      WHERE user_id = $4 AND timeline_id = $5
      `,
      [date, sets, Date.now(), userId, timelineId],
    );
  },
};
