import express from "express";
import dotenv from "dotenv";
import { userRouter } from "./module/user/user.routes.js";

dotenv.config();

const app = express();
app.use(express.json());

app.use("/api/v1/auth", userRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/courses", userRouter);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
