declare global {
  namespace NodeJS {
    interface ProcessEnv {
      JWT_SECRET: string;
      PORT: string;
      MONGO_URI: string;
    }
  }
}
import dotenv from "dotenv";
dotenv.config();

import express from "express";
import mongoose from "mongoose";
import userRouter from "./routes/user";
import adminRouter from "./routes/admin";
import { errorMiddleWare } from "./middleware/errorMiddleWare";
import config from "./config/config";

const app = express();
main();
app.use(express.json());

app.use("/api/user", userRouter);
app.use("/api/admin", adminRouter);

async function main() {
  app.listen(config.port, () => {
    console.log("listening on port 3000");
    console.log(config.mongo_uri);
  });
  await mongoose.connect(config.mongo_uri);
}

app.use(errorMiddleWare);
