import { Router } from "express";
import {
  getCourses,
  getMyCourses,
  purchaseCourse,
  signin,
  signup,
} from "../handlers/user";
import { auth } from "../middleware/authenticationMW";

const userRouter = Router();

userRouter.post("/signup", signup);
userRouter.post("/signin", signin);
userRouter.get("/content", auth, getCourses);
userRouter.post("/purchase", auth, purchaseCourse);
userRouter.get("/mycontent", auth, getMyCourses);

export default userRouter;
