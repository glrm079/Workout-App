import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";
import { User } from "../../../@types";
import { UserRepository } from "../repositories/user.repository";

export const UserService = {
  createUser: async (username: string, email: string, password: string) => {
    try {
      const newUser: User = {
        userId: uuidv4(),
        username,
        email,
        password,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      };

      return await UserRepository.create(newUser);
    } catch (err) {
      console.error(err);
    }
  },

  signinUser: async (email: string, password: string) => {
    try {
      const user = await UserRepository.getUser(email, password);
      const secret = process.env.JWT_SECRET;
      const id = user?.userId;

      if (!user) {
        throw new Error();
      }

      if (!secret) {
        throw new Error("JWT_SECRET is not set");
      }

      const token = jwt.sign({ id }, secret, { expiresIn: "1h" });

      return token;
    } catch (err) {
      return console.error(err);
    }
  },
};
