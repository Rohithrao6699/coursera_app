import { useRecoilValue } from "recoil";
import { AllCoursesAtom } from "../store/userStore/AllCoursesAtom";
import { Button } from "./Button";
import { DeleteIcon } from "../icons/delete";

interface CourseCardProps {
  handleClick?: () => void;
  _id: string;
  type: string;
}
export function CourseCard(props: CourseCardProps) {
  const allCourses = useRecoilValue(AllCoursesAtom);
  const course = allCourses.find((course) => course._id === props._id);
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
              icon={<DeleteIcon size="md" />}
            />
          )}
        </div>
      )}
    </>
  );
}
