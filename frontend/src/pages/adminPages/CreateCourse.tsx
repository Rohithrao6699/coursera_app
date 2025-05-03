import { useRef } from "react";
import { Button } from "../../ui/Button";
import { adminCreateCourse } from "../../api/adminapi";
import { AdminCoursesAtom } from "../../store/adminStore/AllCoursesAtom";
import { useSetRecoilState } from "recoil";

export function CreateCourse() {
  const setAdminCourses = useSetRecoilState(AdminCoursesAtom);
  const titleRef = useRef<HTMLInputElement>(null);
  const taglineRef = useRef<HTMLInputElement>(null);
  const skillsRef = useRef<HTMLInputElement>(null);
  const imageRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLInputElement>(null);
  const levelRef = useRef<HTMLInputElement>(null);
  const priceRef = useRef<HTMLInputElement>(null);
  const seatsRef = useRef<HTMLInputElement>(null);

  async function handleSubmit(e: any) {
    e.preventDefault();
    const title = titleRef.current?.value;
    const tagLine = taglineRef.current?.value;
    const skills = skillsRef.current?.value;
    const image = imageRef.current?.value;
    const content = contentRef.current?.value;
    const level = levelRef.current?.value;
    const price = priceRef.current?.value;
    const seats = seatsRef.current?.value;
    const noOfSeats = parseInt(seats as string);

    const token = localStorage.getItem("token");
    //useZod here for validation
    if (
      title &&
      tagLine &&
      skills &&
      image &&
      content &&
      level &&
      price &&
      noOfSeats &&
      token
    ) {
      const body = {
        title,
        tagLine,
        skills,
        image,
        body: content,
        level,
        price,
        seats: noOfSeats,
      };
      const data = await adminCreateCourse(body, token);
      if (data.success === true) {
        const newCourse = data.content;
        //data can be of type --  CourseType | CourseType[] | undefined
        if (newCourse && !Array.isArray(newCourse))
          //now it is checking if it of only courseType
          setAdminCourses((prev) => [...prev, newCourse]);
        //hence this works now
        alert("course created");
        //use react-toast to show better alert
        if (titleRef.current) titleRef.current.value = "";
        if (taglineRef.current) taglineRef.current.value = "";
        if (skillsRef.current) skillsRef.current.value = "";
        if (imageRef.current) imageRef.current.value = "";
        if (contentRef.current) contentRef.current.value = "";
        if (levelRef.current) levelRef.current.value = "";
        if (priceRef.current) priceRef.current.value = "";
        if (seatsRef.current) seatsRef.current.value = "";
      }
    }
  }
  return (
    <>
      <div>
        <form
          onSubmit={handleSubmit}
          className="flex w-full flex-col gap-4 rounded-lg bg-white p-8 shadow-lg"
        >
          <input
            placeholder="title"
            ref={titleRef}
            className="input-field rounded-md p-2 outline-1"
          />
          <input
            placeholder="tagline"
            ref={taglineRef}
            className="input-field rounded-md p-2 outline-1"
          />
          <input
            placeholder="skills"
            ref={skillsRef}
            className="input-field rounded-md p-2 outline-1"
          />
          <input
            placeholder="image"
            ref={imageRef}
            className="input-field rounded-md p-2 outline-1"
          />
          <input
            placeholder="content"
            ref={contentRef}
            className="input-field rounded-md p-2 outline-1"
          />
          <input
            placeholder="level"
            ref={levelRef}
            className="input-field rounded-md p-2 outline-1"
          />
          <input
            placeholder="price"
            ref={priceRef}
            className="input-field rounded-md p-2 outline-1"
          />
          <input
            placeholder="seats"
            ref={seatsRef}
            className="input-field rounded-md p-2 outline-1"
          />
          <Button
            variant="create"
            size="md"
            text="Create Course"
            type="submit"
          />
        </form>
      </div>
    </>
  );
}
