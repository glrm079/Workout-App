import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";
import { User } from "../../../@types";
import { UserRepository } from "../repositories/user.repository";

export const UserService = {
  createUser(username: string, email: string, password: string): User {
    const newUser: User = {
      userId: uuidv4(),
      username,
      email,
      password,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    return UserRepository.create(newUser);
  },

  authenticateUser(email: string, password: string): unknown {
    const user = UserRepository.getUser(email, password);

    if (!user) {
      return false;
    }

    const id = user?.userId;
    const secret = "this_is_a_test_secret_key_for_jwt_token_generation";
    const token = jwt.sign({ id }, secret, { expiresIn: "1h" });

    return token;
  },
};
