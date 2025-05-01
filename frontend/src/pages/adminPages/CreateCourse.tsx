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
    const tagline = taglineRef.current?.value;
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
      tagline &&
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
        tagline,
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
        <form onSubmit={handleSubmit}>
          <input placeholder="title" ref={titleRef} />
          <input placeholder="tagline" ref={taglineRef} />
          <input placeholder="skills" ref={skillsRef} />
          <input placeholder="image" ref={imageRef} />
          <input placeholder="content" ref={contentRef} />
          <input placeholder="level" ref={levelRef} />
          <input placeholder="price" ref={priceRef} />
          <input placeholder="seats" ref={seatsRef} />
          <Button
            variant="primary"
            size="md"
            text="create course"
            type="submit"
          />
        </form>
      </div>
    </>
  );
}
