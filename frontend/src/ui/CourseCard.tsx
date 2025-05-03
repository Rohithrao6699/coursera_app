import { useRecoilState, useSetRecoilState } from "recoil";
import { AllCoursesAtom } from "../store/userStore/AllCoursesAtom";
import { Button } from "./Button";
import { DeleteIcon } from "../icons/delete";
import { AdminCoursesAtom } from "../store/adminStore/AllCoursesAtom";
import { deleteCourse } from "../api/adminapi";
import { CartCoursesAtom } from "../store/userStore/UserCasrtAtom";

interface CourseCardProps {
  handleClick?: () => void;
  _id: string;
  type: string;
  from?: string;
}
export function CourseCard(props: CourseCardProps) {
  const [admincourses, setAdminCourses] = useRecoilState(AdminCoursesAtom);
  const [allCourses, setAllCourses] = useRecoilState(AllCoursesAtom);
  const setAddtoCartAtom = useSetRecoilState(CartCoursesAtom);
  //
  let course: any;
  if (props.type === "admin") {
    course = admincourses.find((c) => c._id === props._id);
  } else {
    course = allCourses.find((course) => course._id === props._id);
  }
  //
  function handleCartDelete() {
    setAddtoCartAtom((prev) => prev.filter((c) => c._id !== props._id));
  }
  //
  async function handleDelete() {
    console.log("clicked on delete");
    const courseId = course._id;
    console.log(courseId);
    const token = localStorage.getItem("token");
    if (token) {
      const data = await deleteCourse(courseId, token);
      if (data.success) {
        const deletedCourse = data.content;
        if (deletedCourse && !Array.isArray(deletedCourse))
          console.log(deletedCourse);
        setAdminCourses((prev) => prev.filter((c) => c._id !== courseId));
        setAllCourses((prev) => prev.filter((c) => c._id !== courseId));
      }
    } else {
      console.log("you cannot delete as you are not logged in");
    }
  }
  //filter will return an array, find will just return 1 document
  return (
    <>
      {course && (
        <div
          className="flex flex-col gap-2 max-w-55 min-w-50 min-h-65 max-h-100 p-2 rounded-md outline-3 cursor-pointer outline-slate-200 hover:bg-neutral-50 hover:outline-2 hover:shadow-2xl hover:shadow-[#c5c3eb]"
          onClick={props.handleClick}
        >
          <div className="outline-1 outline-slate-200 rounded-sm min-h-25">
            <img alt="image" />
          </div>
          <div className="min-h-15 flex flex-col gap-1 py-1">
            <p className="font-medium text-xs tracking-wide">{course.title}</p>
            <p className="font-thin text-xs">{course.tagLine}</p>
          </div>
          <div className="min-h-10">
            <p className="text-xs">
              <span className="text-xs font-medium tracking-normal">
                Skills you'll gain:{" "}
              </span>
              {course.skills}
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-xs">
              <span className="font-medium">Price:</span> 123
            </p>
            <p className="flex flex-row items-center justify-between">
              <span className="text-[8px]">{`Level: ${course.level}`}</span>
              <span className="text-[8px]">{`Remaining Seats: ${course.seats}`}</span>
            </p>
          </div>
          {props.type === "admin" && (
            <div className="pt-3">
              <Button
                variant="primary"
                size="md"
                text="Delete Course"
                onClick={handleDelete}
                icon={<DeleteIcon size="md" />}
              />
            </div>
          )}
          {props.from === "cart" && (
            <div className="flex flex-row items-center justify-between gap-2 pt-2">
              <Button
                variant="delete"
                size="sm"
                text="remove"
                onClick={handleCartDelete}
                icon={<DeleteIcon size="md" />}
              />
              <Button
                variant="secondary"
                size="sm"
                text="Buy Now"
                onClick={handleCartDelete}
              />
            </div>
          )}
        </div>
      )}
    </>
  );
}
