import { atom } from "recoil";
import { CourseType } from "../types/UserTypes";
export const AllCoursesAtom = atom<CourseType[]>({
  key: "allCourses",
  default: [],
});
