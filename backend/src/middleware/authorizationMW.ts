import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config/config";
import { adminModel } from "../db/schema";
import { AppError } from "../types/AppError";

export async function authorization(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token = req.headers["authorization"];

  if (token) {
    console.log(token);
    const decodedInfo = jwt.verify(token, config.jwt_secret);
    if (decodedInfo) {
      const _id = (decodedInfo as JwtPayload)._id;
      console.log(_id);
      const admin = await adminModel.findOne({ _id: _id });
      console.log(admin);
      if (admin?.role === "admin") {
        next();
      } else {
        throw new AppError(
          "you are not authorized to access this endpoint",
          401
        );
      }
    } else {
      throw new AppError("unable to verify auth token", 400);
    }
  } else {
    throw new AppError("token not valid", 400);
  }
}
