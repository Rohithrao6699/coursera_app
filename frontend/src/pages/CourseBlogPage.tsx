import { useRecoilValue } from "recoil";
import { CourseBlogContent } from "../components/CourseBlogContent";
import { AllCoursesAtom } from "../store/AllCoursesAtom";
import { useParams } from "react-router-dom";

export function CourseBlogPage() {
  const { courseId } = useParams();
  const allCourses = useRecoilValue(AllCoursesAtom);
  const course = allCourses.find((course) => course._id === courseId);

  return <>{course && <CourseBlogContent filteredcourse={course} />}</>;
}
