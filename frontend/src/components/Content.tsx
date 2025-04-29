import { useNavigate } from "react-router-dom";
import { CourseCard } from "../ui/CourseCard";

export function Content() {
  const navigate = useNavigate();
  function handleClick() {
    navigate("course");
  }
  return (
    <>
      <div className="bg-blue-200 w-60">siders</div>
      <div className="bg-green-200 grid grid-cols-3 gap-4 place-items-center w-full">
        <CourseCard handleClick={handleClick} />
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
