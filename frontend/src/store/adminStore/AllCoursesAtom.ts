import { atom } from "recoil";
import { CourseType } from "../../types/AdminTypes";

export const AdminCoursesAtom = atom<CourseType[]>({
  default: [],
  key: "adminCourses",
});
