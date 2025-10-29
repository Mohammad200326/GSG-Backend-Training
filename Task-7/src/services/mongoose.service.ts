import mongoose, { Document, FlatRecord } from "mongoose";
import { getEnvOrThrow } from "../utils/util";
import { seedAdmin } from "../seeds";
import { removeFields } from "../utils/object.util";

mongoose
  .connect(getEnvOrThrow("MONGO_URI"))
  .then(async () => {
    console.log("Mongo DB connected successfully");

    await seedAdmin();
    console.log("Admin user ready");
  })
  .catch((error) => console.error(error));

export const schemaToJsonDefaultOption = {
  virtuals: true,
  transform: (doc: Document, ret: FlatRecord<Record<string, unknown>>) => {
    return removeFields(ret, ["_id", "__v", "password"]);
  },
};

export const mongooseConnection = mongoose.connection;
