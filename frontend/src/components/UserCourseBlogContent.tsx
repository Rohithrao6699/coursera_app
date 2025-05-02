import { useSetRecoilState } from "recoil";
import { addToCart, userPurchaseCourse } from "../api/userapi";
import { CourseBlogContentType } from "../types/UserTypes";
import { Button } from "../ui/Button";
import { UserCoursesAtom } from "../store/userStore/UserCourseAtom";
import { CartCoursesAtom } from "../store/userStore/UserCasrtAtom";

export function UserCourseBlogContent({
  filteredcourse,
}: CourseBlogContentType) {
  //
  const setUserCourses = useSetRecoilState(UserCoursesAtom);
  const setAddtoCartAtom = useSetRecoilState(CartCoursesAtom);
  //
  async function handlePurchase() {
    const courseId = filteredcourse._id;
    console.log("control reached to handlePurchase");
    const token = localStorage.getItem("token");
    console.log(token);
    if (token) {
      const data = await userPurchaseCourse(token, courseId);
      if (data.success === true) {
        console.log("purchased data is successfull");
        const purchasedCourse = data.content;
        if (purchasedCourse && !Array.isArray(purchasedCourse)) {
          //push to usercourses
          console.log(purchasedCourse);
          setUserCourses((prev) => [...prev, purchasedCourse]);
          console.log("course purchased");
        }
      }
    }
  }

  async function handleAddToCart() {
    const token = localStorage.getItem("token");
    const body = { courseId: filteredcourse._id };
    console.log("filteredCourse", body);
    if (token) {
      const data = await addToCart(token, body);
      if (data.success === true) {
        setAddtoCartAtom((prev) => [...prev, filteredcourse]);
        console.log("course added to cart");
      } else {
        console.log("unable to add course to cart");
      }
    }
    //logic to add to cart
    //have to state to add courses from allcourses to this state
    //have another state that counts the number of items in cart or increment evrytime something gets added
    //have buy now button or delete from cart options,
    //buy now will move that course to the UserCourseAtom
    //remove will delete that course from the cartState!
  }
  return (
    <>
      <div className="flex flex-col gap-2 p-4">
        <h2 className="font-semibold text-xl">{filteredcourse.title}</h2>
        <img alt="image" src={filteredcourse.image} className="min-h-40" />
        <h4 className="font-semibold text-lg">{filteredcourse.title}</h4>
        <p className="font-thin text-md">{filteredcourse.body}</p>
        <p>
          <span>skills you'll gain:</span>
          {filteredcourse.skills}
        </p>
        <div className="flex gap-2">
          <Button
            variant="primary"
            size="lg"
            text="buy now"
            onClick={handlePurchase}
          />
          <Button
            variant="primary"
            size="lg"
            text="add to cart"
            onClick={handleAddToCart}
          />
        </div>
      </div>
    </>
  );
}
