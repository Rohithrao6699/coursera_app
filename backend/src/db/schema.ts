import mongoose, { model, Schema } from "mongoose";

const userType = ["user", "admin"];
const courseLevelType = ["easy", "intermediate", "hard"];

const UserSchema = new Schema({
  name: String,
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: userType },
});

const AdminSchema = new Schema({
  name: String,
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: userType },
});

const CourseSchema = new Schema({
  title: { type: String, required: true },
  body: { type: String, required: true },
  image: { type: String },
  seats: { type: Number, required: true },
  tagLine: { type: String, required: true },
  level: { type: String, enum: courseLevelType, required: true },
  skills: { type: String, required: true },
  adminId: { type: mongoose.Types.ObjectId, ref: "admins" },
});

const PurchasedCourses = new Schema({
  courseId: [{ type: mongoose.Types.ObjectId, ref: "courses" }],
  userId: { type: mongoose.Types.ObjectId, ref: "users" },
});

const AddedToCart = new Schema({
  courses: [{ type: mongoose.Types.ObjectId, ref: "courses" }],
  userId: { type: mongoose.Types.ObjectId, ref: "users" },
});

export const userModel = model("users", UserSchema);
export const adminModel = model("admins", AdminSchema);
export const courseModel = model("courses", CourseSchema);
export const purchaseModel = model("purchases_courses", PurchasedCourses);
export const addToCartModel = model("cart", AddedToCart);
