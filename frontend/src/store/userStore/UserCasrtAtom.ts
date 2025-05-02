import { atom } from "recoil";
import { CourseType } from "../../types/UserTypes";

export const CartCoursesAtom = atom<CourseType[]>({
  default: [],
  key: "cartCourses",
});
