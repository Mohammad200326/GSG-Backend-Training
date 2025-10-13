import express from "express";
import type { Request, Response, NextFunction } from "express";
import { authRouter } from "./auth/auth.routes";
import { userRouter } from "./users/user.routes";
import { courseRouter } from "./courses/course.routes";
import path from "node:path";
import { handleError } from "./utils/exception";
import { responseEnhancer } from "./middlewares/response.middleware";

const app = express();

app.use(express.json());
app.use(responseEnhancer);

const PORT = 5000;

app.get("/", (req: Request, res: Response) => {
  res.json("Welcome, Server is running successfully");
});

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api/v1/auth", authRouter);

app.use("/api/v1/users", userRouter);

app.use("/api/v1/courses", courseRouter);

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  handleError(error, res);
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
