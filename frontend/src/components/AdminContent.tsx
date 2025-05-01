import { useRecoilState, useRecoilValue } from "recoil";
import { myCourses } from "../api/adminapi";
import { CourseCard } from "../ui/CourseCard";
import { AdminCoursesAtom } from "../store/adminStore/AllCoursesAtom";
import { useEffect } from "react";
import { CreateUserAtom } from "../store/CreateUserAtom";
import { useNavigate } from "react-router-dom";

export function AdminContent() {
  const [adminCourses, setAdminCourses] = useRecoilState(AdminCoursesAtom);
  const userType = useRecoilValue(CreateUserAtom);

  async function fetchCourses() {
    const token = localStorage.getItem("token");
    if (token) {
      const data = await myCourses(token);
      if (data.success) {
        if (data.content && Array.isArray(data.content)) {
          setAdminCourses(data.content);
        }
      }
    }
  }
  useEffect(() => {
    fetchCourses();
  }, []);
  return (
    <>
      <div className="bg-blue-200 w-60">siders</div>
      <div className="bg-green-200 grid grid-cols-3 gap-4 place-items-center w-full">
        <EmptyCourseCard />
        {adminCourses.length > 0 &&
          adminCourses.map((course) => (
            <CourseCard _id={course._id} type={userType as string} />
          ))}
      </div>
    </>
  );
}

function EmptyCourseCard() {
  const navigate = useNavigate();
  function handleCreateCourseClick() {
    console.log("Create Course");
    navigate("createcourse");
  }
  return (
    <>
      <div
        className="flex flex-col gap-2 bg-slate-200 max-w-70 min-h-65 max-h-100 p-2 rounded-md shadow-lg"
        onClick={handleCreateCourseClick}
      >
        <div className="bg-yellow-100 min-h-25">
          {/* <img alt="image" /> */}
        </div>
        <div className="min-h-35 flex flex-col gap-2 py-1">
          {/* <p className="font-medium text-xs">title</p>
          <p className="font-thin text-xs">tagline</p> */}
        </div>
        {/* <div className="min-h-15 py-2">
          <p className="text-xs">
            <span className="text-sm">skills you'll gain:</span>
            skills
          </p>
        </div> */}
        <div className="bg-red-100 min-h-10">
          {/* <p>{`type-`}</p>
          <p>{Date.now()}</p> */}
        </div>
      </div>
    </>
  );
}
