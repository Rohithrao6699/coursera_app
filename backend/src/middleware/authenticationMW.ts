import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { AppError } from "../types/AppError";
import config from "../config/config";

export async function auth(req: Request, res: Response, next: NextFunction) {
  const token = req.headers["authorization"];
  console.log(token);
  if (token) {
    console.log(token);
    try {
      const decodedInfo = jwt.verify(token, config.jwt_secret);
      console.log(decodedInfo);
      req.userId = (decodedInfo as JwtPayload)._id;
      next();
    } catch (error) {
      throw new AppError("invalid or expired token!", 401);
    }
  } else {
    throw new AppError("no token in headers", 401);
  }
}
