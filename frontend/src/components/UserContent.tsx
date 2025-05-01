import { useNavigate } from "react-router-dom";
import { CourseCard } from "../ui/CourseCard";
import { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { userContent } from "../api/userapi";
import { AllCoursesAtom } from "../store/userStore/AllCoursesAtom";
import { CreateUserAtom } from "../store/CreateUserAtom";

export function UserContent() {
  const [allcourses, setAllCourses] = useRecoilState(AllCoursesAtom);
  const UserType = useRecoilValue(CreateUserAtom);
  const navigate = useNavigate();
  function handleClick(_id: string) {
    navigate(`course/${_id}`);
  }

  async function fetchCourses() {
    const token = localStorage.getItem("token");
    if (token) {
      const data = await userContent(token);
      if (data?.success === true) {
        if (data.content && Array.isArray(data.content)) {
          setAllCourses(data.content);
        }
      }
    }
  }
  useEffect(() => {
    console.log("atom received!");
    fetchCourses();
  }, []);

  return (
    <>
      <div className="bg-blue-200 w-60">siders</div>
      <div className="bg-green-200 grid grid-cols-3 gap-4 place-items-center w-full">
        {UserType &&
          allcourses.map((course) => (
            <CourseCard
              handleClick={() => handleClick(course._id)}
              _id={course._id}
              type={UserType}
            />
          ))}

        {/* <CourseCard />
        <CourseCard />
        <CourseCard />
        <CourseCard />
        <CourseCard />
        <CourseCard />
        <CourseCard />
        <CourseCard />
        <CourseCard />
        <CourseCard />
        <CourseCard />
        <CourseCard />
        <CourseCard /> */}
      </div>
    </>
  );
}
