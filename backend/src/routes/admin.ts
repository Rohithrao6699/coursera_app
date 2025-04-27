import { Router } from "express";
import { createCourse, deleteCourse, signin, signup } from "../handlers/admin";
import { auth } from "../middleware/authenticationMW";
import { authorization } from "../middleware/authorizationMW";

const adminRouter = Router();

adminRouter.post("/signup", signup);
adminRouter.post("/signin", signin);
adminRouter.post("/createCourse", auth, authorization, createCourse);
adminRouter.post("/deleteCourse/:courseId", auth, authorization, deleteCourse);

export default adminRouter;
