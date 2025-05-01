import { atom } from "recoil";
import { CourseType } from "../../types/UserTypes";

export const UserCoursesAtom = atom<CourseType[]>({
  default: [],
  key: "UserCoursesAtom",
});
