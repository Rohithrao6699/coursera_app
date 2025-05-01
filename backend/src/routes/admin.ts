import { Router } from "express";
import {
  createCourse,
  deleteCourse,
  myCourses,
  signin,
  signup,
} from "../handlers/admin";
import { auth } from "../middleware/authenticationMW";
import { authorization } from "../middleware/authorizationMW";

const adminRouter = Router();

adminRouter.post("/signup", signup);
adminRouter.post("/signin", signin);
adminRouter.post("/createCourse", auth, authorization, createCourse);
adminRouter.get("/myCourse", auth, authorization, myCourses);
adminRouter.post("/deleteCourse/:courseId", auth, authorization, deleteCourse);

export default adminRouter;
