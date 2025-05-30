import { NextFunction, Request, Response } from "express";
import { z } from "zod";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {
  addToCartModel,
  courseModel,
  purchaseModel,
  userModel,
} from "../db/schema";
import { AppError } from "../types/AppError";
import config from "../config/config";
import { signInUserSchema, signUpUserSchema } from "../utils/zodObject";
import { userBody } from "../types/user";

export async function signup(
  req: Request<{}, {}, userBody, {}>,
  res: Response,
  next: NextFunction
) {
  const { username, password, name } = req.body;

  const validUser = signUpUserSchema.safeParse({
    username,
    password,
    name,
  });
  type User = z.infer<typeof signUpUserSchema>;

  if (validUser.success) {
    try {
      const safeUser: User = { username, password, name };
      const hashed = await bcrypt.hash(safeUser.password, 10);

      const createdUser = await userModel.create({
        username: safeUser.username,
        password: hashed,
        name: safeUser.name,
        role: "user",
      });
      if (createdUser) {
        res.status(200).json({
          success: true,
          createdUser,
        });
      } else {
        res.status(411).json({
          success: false,
          message: "unable to create user, try again!",
        });
      }
    } catch (error) {
      next(error);
    }
  } else {
    throw validUser.error;
  }
}

export async function signin(
  req: Request<{}, {}, userBody, {}>,
  res: Response,
  next: NextFunction
) {
  const { username, password } = req.body;

  const validUser = signInUserSchema.safeParse({
    username,
    password,
  });
  type User = z.infer<typeof signInUserSchema>;
  if (validUser.success) {
    const safeUser: User = { username, password };
    try {
      const userMatch = await userModel.findOne({
        username: safeUser.username,
      });
      if (userMatch?.password) {
        const passwordMatch = await bcrypt.compare(
          safeUser.password,
          userMatch.password
        );
        if (passwordMatch) {
          const _id = userMatch._id;
          const token = jwt.sign({ _id }, config.jwt_secret);
          res.status(200).json({
            success: true,
            token,
          });
        } else {
          throw new AppError("wrong password entered", 403);
        }
      } else {
        throw new AppError("user not found", 403);
      }
    } catch (error) {
      next(error);
    }
  } else {
    throw validUser.error;
  }
}

export async function getCourses(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const userId = req.userId;

  if (userId) {
    try {
      const courses = await courseModel.find({});
      if (courses) {
        res.status(200).json({ success: true, content: courses });
      }
    } catch (error) {
      next(error);
    }
  } else {
    throw new AppError("user not authenticated!", 401);
  }
}

export async function getMyCourses(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const userId = req.userId;
  if (userId) {
    try {
      const user = await userModel.findOne({ _id: userId });
      if (user) {
        const purchased = await purchaseModel.findOne({ userId: user._id });
        if (purchased) {
          const purchasedCourses = await courseModel.find({
            _id: {
              $in: purchased.courseId,
            },
          });
          res.status(200).json({ success: true, content: purchasedCourses });
        } else {
          res.status(400).json({
            success: false,
            message: "user has no courses purchased!",
          });
        }
      } else {
        throw new AppError("user not found!", 411);
      }
    } catch (error) {
      next(error);
    }
  }
}

export async function purchaseCourse(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const userId = req.userId;
  const courseId = req.params.courseId;
  try {
    const user = await userModel.findOne({ _id: userId });
    const course = await courseModel.findOne({ _id: courseId });

    if (user && course) {
      if (course.seats <= 0) {
        res.status(409).json({
          success: false,
          message: "no more seats available in this course",
        });
      } else {
        const updatedPurchase = await purchaseModel.findOneAndUpdate(
          { userId: user._id },
          { $addToSet: { courseId: course._id } },
          { upsert: true, new: true }
        );
        if (updatedPurchase) {
          const seatsUpdated = await courseModel.findOneAndUpdate(
            { _id: course._id },
            { $inc: { seats: -1 } },
            { new: true }
          );
          res.status(200).json({
            success: true,
            content: course,
            allPurchases: updatedPurchase,
            remainingSeats: seatsUpdated?.seats,
          });
        }
      }
    } else {
      res
        .status(404)
        .json({ success: false, message: "user or course not found" });
    }
  } catch (error) {
    next(error);
  }
}

export async function addToCart(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const userId = req.userId;
  const courseId = req.body.courseId;
  console.log(courseId);

  try {
    const user = await userModel.findOne({ _id: userId });
    if (user) {
      const alreadyExsisting = await addToCartModel.findOne({
        userId: userId,
        courses: { $in: [courseId] },
        //"Find if any element in the courses array matches this courseId"
      });
      if (alreadyExsisting) {
        res.status(403).json({ success: true, message: "already in cart" });
      } else {
        const addedToCart = await addToCartModel.findOneAndUpdate(
          { userId },
          { $addToSet: { courses: courseId } },
          { upsert: true, new: true }
        );
        if (addedToCart) {
          res.status(200).json({
            success: true,
            content: addedToCart,
            message: "succesfully added to cart",
          });
        } else {
          throw new AppError("unable to add to cart", 400);
        }
      }
    } else {
      throw new AppError("user not found", 400);
    }
  } catch (error) {
    next(error);
  }
}

export async function getCartCourses(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const userId = req.userId;

  if (userId) {
    const user = await userModel.findOne({ _id: userId });
    if (user) {
      const cartCourses = await addToCartModel
        .findOne({ userId: user._id })
        .populate("courses");
      if (cartCourses) {
        res.status(200).json({ success: true, content: cartCourses });
      } else {
        res.status(411).json({ success: false, message: "no courses in cart" });
      }
    } else {
      throw new AppError("user not found", 411);
    }
  } else {
    throw new AppError("unable to validate token", 411);
  }
}
