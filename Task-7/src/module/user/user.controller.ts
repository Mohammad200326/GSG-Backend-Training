import type { Request, Response } from "express";
import { userService } from "./user.service.js";
import type { User } from "./user.entity.js";

export class UserController {
  private service = userService;

  getUsers = (req: Request, res: Response) => {
    const users = this.service.getUsers();
    res.status(200).json(users);
  };

  getUser = (req: Request<{ id: string }>, res: Response) => {
    const id = req.params.id;
    if (!id) return res.status(400).json({ error: "ID required" });

    const user = this.service.getUser(id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(user);
  };

  updateUser = (req: Request, res: Response) => {
    const id = req.params.id;
    if (!id) return res.status(400).json({ error: "ID required" });

    const { name, email } = req.body;

    const user = this.service.updateUser(id, { name, email });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json(user);
  };

  addCoach = (req: Request, res: Response) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ error: "Name, email, and password are required" });
    }

    const coachData = { name, email, password, role: "COACH" as const };
    const newCoach: User = this.service.addCoach(coachData);

    return res.status(201).json(newCoach);
  };
}
