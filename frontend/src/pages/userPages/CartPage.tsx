import { useRecoilState } from "recoil";
import { getCartCourses } from "../../api/userapi";
import { CartCoursesAtom } from "../../store/userStore/UserCasrtAtom";
import { useEffect } from "react";
import { CourseCard } from "../../ui/CourseCard";
import { useNavigate } from "react-router-dom";

export function CartPage() {
  const navigate = useNavigate();
  const [cartCourses, setAddtoCartAtom] = useRecoilState(CartCoursesAtom);

  function handleClick(_id: string) {
    // navigate(`course/${_id}`);
    console.log(_id);
  }
  //
  async function getCartcourses() {
    const token = localStorage.getItem("token");
    if (token) {
      const data = await getCartCourses(token);
      if (data.success === true) {
        const content = data.content?.courses;
        if (content) {
          setAddtoCartAtom(content);
        }
      }
    }
  }

  useEffect(() => {
    getCartcourses();
  }, []);
  return (
    <>
      {cartCourses.map((course) => (
        <>
          <CourseCard
            _id={course._id}
            type="user"
            key={course._id}
            from="cart"
            handleClick={() => handleClick(course._id)}
          />
        </>
      ))}
    </>
  );
}
