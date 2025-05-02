import { Router } from "express";
import {
  addToCart,
  getCartCourses,
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
userRouter.post("/purchase/:courseId", auth, purchaseCourse);
userRouter.get("/mycontent", auth, getMyCourses);
userRouter.post("/addtocart", auth, addToCart);
userRouter.get("/cartcourses", auth, getCartCourses);

export default userRouter;
