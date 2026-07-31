import { createUsersTable } from "./ migrations/create-users-table";

export async function runMigrations() {
  await createUsersTable();
}
