import { Request, Response } from "express";
import { UserService } from "../services/user.service";

export const UserController = {
  createUser(req: Request, res: Response) {
    if (!req.body) {
      return res.status(400).json({ error: "Missing requisition body" });
    }

    const { username, email, password, repeatPassword } = req.body;

    if (!username || !email || !password || !repeatPassword) {
      return res.status(400).json({ error: "Missing required informations" });
    }

    try {
      const result = UserService.createUser(username, email, password);

      return res.status(201).json(result);
    } catch (error: unknown) {
      return res.status(500).json({ error: (error as Error).message });
    }
  },

  authenticateUser(req: Request, res: Response) {
    if (!req.body) {
      return res.status(400).json({ error: "Missing requisition body" });
    }

    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Missing required informations" });
    }

    try {
      const isAuthenticated = UserService.authenticateUser(email, password);

      if (!isAuthenticated) {
        return res.status(401).json({ error: "Invalid credentials" });
      }

      return res
        .status(200)
        .json({ message: "User authenticated successfully" });
      isAuthenticated;
    } catch (error: unknown) {
      return res.status(500).json({ error: (error as Error).message });
    }
  },
};
