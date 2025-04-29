import { CourseCard } from "../ui/CourseCard";

export function MyCourse() {
  function handleMyCourseClick() {
    console.log("my course clicked");
  }
  return (
    <>
      <div>
        hi, fetch users purchased courses and display them as courseCards
        <CourseCard handleClick={handleMyCourseClick} />
      </div>
    </>
  );
}
