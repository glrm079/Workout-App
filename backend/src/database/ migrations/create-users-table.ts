import { db } from "../connection";

export async function createUsersTable() {
  await db.query(`
    CREATE TABLE IF NOT EXISTS users (
      user_id UUID PRIMARY KEY,
      username TEXT NOT NULL,
      email TEXT NOT NULL,
      created_at BIGINT NOT NULL,
      updated_at BIGINT NOT NULL,
      password TEXT NOT NULL
    )
  `);
}
