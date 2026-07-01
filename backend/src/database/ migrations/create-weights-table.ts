import { db } from "../connection";

export async function createWeightsTable() {
  await db.query(`
    CREATE TABLE IF NOT EXISTS weights (
      weight_id UUID PRIMARY KEY,
      user_id UUID NOT NULL,
      weight NUMERIC NOT NULL,
      date TEXT NOT NULL,
      created_at BIGINT NOT NULL,
      updated_at BIGINT NOT NULL
    );
  `);
}