import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import { AppError } from "../types/AppError";
import mongoose from "mongoose";
import { ZodError } from "zod";

export const errorMiddleWare: ErrorRequestHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  console.log(`error caught ${err}`);

  //mongodb duplicate user
  //this error comes from mongoDb so that don't have a error class
  if (err.code === 11000) {
    res.status(403).json({
      success: false,
      message: "Duplicate value entered!",
    });
    return;
  }

  //mongo required field
  //this error comes from mongoose who has a error class
  if (err instanceof mongoose.Error.ValidationError) {
    res.status(411).json({
      success: false,
      message: "Please enter all the required fields",
    });
    return;
  }

  //zod errors
  if (err instanceof ZodError) {
    res.status(411).json({
      success: false,
      message: "validation failed",
      errors: err.errors.map((e) => ({
        field: e.path.join("."),
        message: e.message,
      })),
    });
    return;
  }

  //custom issue
  if (err instanceof AppError) {
    res.status(err.status).json({
      success: false,
      message: err.message,
    });
    return;
  }

  //fallback error
  res.status(500).json({
    success: false,
    message: "server error or internal issue",
  });
};
