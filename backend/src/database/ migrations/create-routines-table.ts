import { db } from "../connection";

export async function createRoutinesTable() {
  await db.query(`
    CREATE TABLE IF NOT EXISTS routines (
      routine_id UUID PRIMARY KEY,
      display_name TEXT NOT NULL,
      description TEXT NOT NULL,
      user_id UUID NOT NULL,
      enabled BOOLEAN NOT NULL,
      created_at BIGINT NOT NULL,
      updated_at BIGINT NOT NULL
    );
  `);
}