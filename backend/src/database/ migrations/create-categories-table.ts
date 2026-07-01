import { db } from "../connection";

export async function createCategoriesTable() {
  await db.query(`
    CREATE TABLE IF NOT EXISTS categories (
      category_id UUID PRIMARY KEY,
      user_id UUID NOT NULL,
      display_name TEXT NOT NULL,
      color TEXT NOT NULL,
      created_at BIGINT NOT NULL,
      updated_at BIGINT NOT NULL

      FOREIGN KEY (user_id)
        REFERENCES users(user_id)
        ON DELETE CASCADE
    );
  `);
}