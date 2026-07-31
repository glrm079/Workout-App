import { User } from "../../../@types";
import { db } from "../../database/connection";

export const UserRepository = {
  async create(user: User) {
    const result = await db.query(
      `
      INSERT INTO users
      (user_Id, username, email, password, create_at, update_at)
      VALUES($1,$2,$3,$4,$5,$6)
      `,
      [
        user.userId,
        user.username,
        user.email,
        user.password,
        user.createdAt,
        user.updatedAt,
      ],
    );
    return result.rows[0];
  },

  async getUser(email: string, password: string) {
    const result = await db.query(
      `
      SELECT * FROM users WHERE email = $1 AND password = $2
      `,
      [email, password],
    );
    return result.rows[0];
  },
};
