import { useRecoilValue } from "recoil";
import { UserCourseBlogContent } from "../../components/UserCourseBlogContent";
import { useParams } from "react-router-dom";
import { AllCoursesAtom } from "../../store/userStore/AllCoursesAtom";

export function CourseBlogPage() {
  const { courseId } = useParams();
  //got courseId from params
  const allCourses = useRecoilValue(AllCoursesAtom);
  const course = allCourses.find((course) => course._id === courseId);

  return <>{course && <UserCourseBlogContent filteredcourse={course} />}</>;
}
