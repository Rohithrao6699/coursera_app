import { atom } from "recoil";
import { CourseType } from "../../types/AdminTypes";
export const AllCoursesAtom = atom<CourseType[]>({
  key: "allCourses",
  default: [],
});
