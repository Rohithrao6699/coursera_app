import { CourseCard } from "../ui/CourseBox";

export function Content() {
  return (
    <>
      <div className="flex flex-row">
        <div className="bg-blue-200 w-60">siders</div>
        <div className="bg-green-200 grid grid-cols-3 gap-4 place-items-center w-full">
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
          <CourseCard />
          <CourseCard />
          <CourseCard />
        </div>
      </div>
    </>
  );
}
