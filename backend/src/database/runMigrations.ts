import { createCategoriesTable } from "./ migrations/create-categories-table";
import { createUsersTable } from "./ migrations/create-users-table";

export async function runMigrations() {
  await createUsersTable();
  await createCategoriesTable();
}
