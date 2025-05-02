import { NextFunction, Request, Response } from "express";
import { z } from "zod";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { signInUserSchema, signUpUserSchema } from "../utils/zodObject";
import { adminModel, courseModel, userModel } from "../db/schema";
import { AppError } from "../types/AppError";
import config from "../config/config";
import { adminBody } from "../types/admin";

export async function signup(req: Request, res: Response, next: NextFunction) {
  const { username, password, name } = req.body;

  const validUser = signUpUserSchema.safeParse({
    username,
    password,
    name,
  });
  type User = z.infer<typeof signUpUserSchema>;
  if (validUser.success) {
    const safeUser: User = { username, password, name };
    try {
      const hashed = await bcrypt.hash(safeUser.password, 10);

      const createdAdmin = await adminModel.create({
        username: safeUser.username,
        password: hashed,
        name: safeUser.name,
        role: "admin",
      });
      if (createdAdmin) {
        console.log(createdAdmin._id);
        res.status(200).json({ success: true, content: createdAdmin });
      } else {
        res
          .status(411)
          .json({ success: false, message: "unable to create user" });
      }
    } catch (error) {
      next(error);
    }
  } else {
    throw validUser.error;
  }
}

export async function signin(req: Request, res: Response, next: NextFunction) {
  const { username, password } = req.body;

  const validUser = signInUserSchema.safeParse({
    username,
    password,
  });
  type User = z.infer<typeof signInUserSchema>;
  if (validUser.success) {
    const safeUser: User = { username, password };
    console.log(`safeUser: ${JSON.stringify(safeUser)}`);
    const userMatch = await adminModel.findOne({ username: safeUser.username });
    if (userMatch) {
      console.log(userMatch);
      const passwordMatch = await bcrypt.compare(
        safeUser.password,
        userMatch.password
      );
      if (passwordMatch) {
        const _id = userMatch._id;
        console.log(`Id is: ${_id}`);
        const token = jwt.sign({ _id }, config.jwt_secret);
        if (token) {
          res.status(200).json({ success: true, token });
        } else {
          res
            .status(400)
            .json({ success: false, message: "unable to generate token" });
        }
      } else {
        throw new AppError("wrong password entered", 403);
      }
    } else {
      throw new AppError("user not found, wrong email", 403);
    }
  } else {
    throw validUser.error;
  }
}

export async function createCourse(
  req: Request<{}, {}, adminBody, {}>,
  res: Response,
  next: NextFunction
) {
  const { title, body, image, seats, tagLine, level, skills, price } = req.body;
  const userId = req.userId;

  if (userId) {
    try {
      const courseCreated = await courseModel.create({
        title,
        body,
        image,
        seats,
        tagLine,
        level,
        skills,
        adminId: userId,
      });
      if (courseCreated) {
        res.status(200).json({ success: true, content: courseCreated });
      } else {
        res
          .status(400)
          .json({ success: false, message: "unable to create course" });
      }
    } catch (error) {
      next(error);
    }
  } else {
    throw new AppError("not authenticated", 403);
  }
}

export async function myCourses(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const userId = req.userId;
  if (userId) {
    try {
      const allcourses = await courseModel.find({ adminId: userId });
      if (allcourses.length > 0) {
        res.status(200).json({ success: true, content: allcourses });
      } else {
        res.status(400).json({ success: false, message: "no courses created" });
      }
    } catch (error) {
      next(error);
    }
  } else {
    throw new AppError("not authenticated", 403);
  }
}

export async function deleteCourse(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const adminId = req.userId;
  const courseId = req.params.courseId;
  try {
    const admin = await adminModel.findOne({ _id: adminId });
    if (admin) {
      const deletedcourse = await courseModel.deleteOne({
        _id: courseId,
        adminId: admin._id,
      });
      if (deletedcourse) {
        res.status(200).json({ success: true, content: deletedcourse });
      } else {
        res
          .status(400)
          .json({ success: false, message: "unable to delete course" });
      }
    } else {
      throw new AppError("admin does not exsist", 403);
    }
  } catch (error) {
    next(error);
  }
}
