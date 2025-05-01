import { useRecoilState, useRecoilValue } from "recoil";
import { userGetmyContent } from "../../api/userapi";
import { CourseCard } from "../../ui/CourseCard";
import { UserCoursesAtom } from "../../store/userStore/UserCourseAtom";
import { useEffect } from "react";
import { CreateUserAtom } from "../../store/CreateUserAtom";

export function MyCourse() {
  const [myCourses, setMyCourses] = useRecoilState(UserCoursesAtom);
  const userType = useRecoilValue(CreateUserAtom);

  function handleMyCourseClick() {
    console.log("my course clicked");
  }

  async function getmyCourses() {
    const token = localStorage.getItem("token");
    if (token) {
      const data = await userGetmyContent(token);
      if (data.success === true) {
        if (data.content && Array.isArray(data.content))
          setMyCourses(data.content);
      } else {
        //add error logic
      }
    }
  }

  useEffect(() => {
    getmyCourses();
  }, []);

  return (
    <>
      <div>
        hi, fetch users purchased courses and display them as courseCards
        {myCourses.map((course) => (
          <CourseCard
            handleClick={handleMyCourseClick}
            _id={course._id}
            type={userType as string}
          />
        ))}
      </div>
    </>
  );
}
