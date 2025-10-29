import mongoose from "mongoose";
import { getEnvOrThrow } from "../utils/util";
import { seedAdmin } from "../seeds";

mongoose
  .connect(getEnvOrThrow("MONGO_URI"))
  .then(async () => {
    console.log("Mongo DB connected successfully");

    await seedAdmin();
    console.log("Admin user ready");
  })
  .catch((error) => console.error(error));

export const mongooseConnection = mongoose.connection;
