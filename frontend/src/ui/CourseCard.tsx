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
          className="flex flex-col gap-2 bg-slate-200 max-w-70 min-h-65 max-h-100 p-2 rounded-md shadow-lg"
          onClick={props.handleClick}
        >
          <div className="bg-yellow-100 min-h-25">
            <img alt="image" />
          </div>
          <div className="min-h-20 flex flex-col gap-2 py-1">
            <p className="font-medium text-xs">{course.title}</p>
            <p className="font-thin text-xs">{course.tagLine}</p>
          </div>
          <div className="min-h-15 py-2">
            <p className="text-xs">
              <span className="text-sm">skills you'll gain:</span>
              {course.skills}
            </p>
          </div>
          <div className="">
            <p>{`type-${course.level}`}</p>
            <p>{Date.now()}</p>
          </div>
          {props.type === "admin" && (
            <Button
              variant="primary"
              size="md"
              text="Delete Course"
              onClick={handleDelete}
              icon={<DeleteIcon size="md" />}
            />
          )}
          {props.from === "cart" && (
            <>
              <Button
                variant="primary"
                size="md"
                text="remove from cart"
                onClick={handleCartDelete}
                icon={<DeleteIcon size="md" />}
              />
            </>
          )}
        </div>
      )}
    </>
  );
}
