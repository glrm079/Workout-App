import { db } from "../connection";

export async function createExercisesTable() {
  await db.query(`
    CREATE TABLE IF NOT EXISTS exercises (
      exercise_id UUID PRIMARY KEY,
      routine_id UUID[] NOT NULL,
      category_id UUID[] NOT NULL,
      display_name TEXT NOT NULL,
      description TEXT,
      user_id UUID NOT NULL,
      created_at BIGINT NOT NULL,
      updated_at BIGINT NOT NULL
    );
  `);
}
