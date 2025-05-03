import { useNavigate } from "react-router-dom";
import { CourseCard } from "../ui/CourseCard";
import { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { userContent } from "../api/userapi";
import { AllCoursesAtom } from "../store/userStore/AllCoursesAtom";
import { CreateUserAtom } from "../store/CreateUserAtom";
import { isSidebarOpen } from "../store/SideBarAtom";
import { Sidebar } from "./SideBar";

export function UserContent() {
  const isOpen = useRecoilValue(isSidebarOpen);
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
      <div className="flex-1 flex flex-row h-[100%]">
        <div
          className={`bg-[#F9FBFC] flex flex-col py-2 gap-10 
        transition-all duration-300 ease-in-out 
        ${isOpen ? "w-60" : "w-12"}`}
        >
          <Sidebar />
        </div>
        <div className="grid grid-cols-4 gap-2 place-items-center w-full">
          {UserType &&
            allcourses.map((course) => (
              <CourseCard
                handleClick={() => handleClick(course._id)}
                _id={course._id}
                type={UserType}
              />
            ))}
        </div>
      </div>
    </>
  );
}
