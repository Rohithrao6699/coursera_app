import { useRecoilState, useRecoilValue } from "recoil";
import { myCourses } from "../api/adminapi";
import { CourseCard } from "../ui/CourseCard";
import { AdminCoursesAtom } from "../store/adminStore/AllCoursesAtom";
import { useEffect } from "react";
import { CreateUserAtom } from "../store/CreateUserAtom";
import { useNavigate } from "react-router-dom";
import { PlusIcon } from "../icons/plusIcon";
import { Sidebar } from "./SideBar";
import { isSidebarOpen } from "../store/SideBarAtom";
import { LeftIcon } from "../icons/left";

export function AdminContent() {
  const [adminCourses, setAdminCourses] = useRecoilState(AdminCoursesAtom);
  const userType = useRecoilValue(CreateUserAtom);
  const isOpen = useRecoilValue(isSidebarOpen);

  async function fetchCourses() {
    const token = localStorage.getItem("token");
    console.log(userType);

    if (token) {
      const data = await myCourses(token);
      if (data.success) {
        if (data.content && Array.isArray(data.content)) {
          console.log(data.content);
          setAdminCourses(data.content);
          console.log(`adminCourses: ${JSON.stringify(adminCourses)}`);
        }
      }
    }
  }
  useEffect(() => {
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
          <EmptyCourseCard />
          {adminCourses.length > 0 ? (
            adminCourses.map((course) => (
              <CourseCard
                _id={course._id}
                type={userType as string}
                key={course._id}
              />
            ))
          ) : (
            <div className="text-lg font-medium tracking-wider">
              Please add your first course by clicking <LeftIcon size="md" />
            </div>
          )}
        </div>
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
        className="flex flex-col gap-2 bg-slate-200 max-w-70 min-w-35 cursor-pointer min-h-65 max-h-100 p-2 rounded-md shadow-lg"
        onClick={handleCreateCourseClick}
      >
        <div className="bg-yellow-100 min-h-25">
          {/* <img alt="image" /> */}
        </div>
        <div className="min-h-35 flex flex-col items-center justify-center gap-2 py-1">
          <div className="bg-slate-300 rounded-full w-30 h-30 flex items-center justify-center">
            <PlusIcon size="lg" />
          </div>
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
