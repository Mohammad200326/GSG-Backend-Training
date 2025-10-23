import "dotenv/config";
import express from "express";
import type { Request, Response, NextFunction } from "express";
import { authRouter } from "./auth/auth.routes";
import { userRouter } from "./users/user.routes";
import { courseRouter } from "./courses/course.routes";
import path from "node:path";
import { handleError } from "./utils/exception";
import { responseEnhancer } from "./middlewares/response.middleware";
import { getEnvOrThrow } from "./utils/util";

const api = "/api/v1";

export const app = express();

app.use(express.json());
app.use(responseEnhancer);

const PORT = getEnvOrThrow("PORT");

app.get("/", (req: Request, res: Response) => {
  res.json("Welcome, Server is running successfully");
});

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use(`${api}/auth`, authRouter);

app.use(`${api}/users`, userRouter);

app.use(`${api}/courses`, courseRouter);

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  handleError(error, res);
});

if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
  });
}
