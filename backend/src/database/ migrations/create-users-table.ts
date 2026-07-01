import { db } from "../connection";

export async function createUsersTable() {
  await db.query(`
    CREATE TABLE IF NOT EXISTS users (
      user_id UUID PRIMARY KEY,
      name TEXT NOT NULL
    )
  `);
}