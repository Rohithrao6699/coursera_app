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
    <div className="flex-1 flex flex-row justify-around p-10 mx-15 h-screen">
      <div className="flex flex-col gap-2 w-90">
        <h2 className=" font-semibold tracking-wide text-xl ">
          {filteredcourse.title}
        </h2>
        <img alt="image" src={filteredcourse.image} className=" h-80" />
        <h4 className="font-semibold text-lg ">{filteredcourse.tagLine}</h4>
        <p className="font-thin text-md ">{filteredcourse.body}</p>
      </div>
      <div className="flex flex-col gap-5 mt-20">
        <p className="text-lg text-[#2f27ce] font-medium">
          Skills you learn:{" "}
          <span className="text-black text-sm">{filteredcourse.skills}</span>
        </p>
        <p className="text-[#2f27ce] text-lg font-medium">
          Remaining seats:{" "}
          <span className="text-black text-sm">{filteredcourse.seats}</span>
        </p>
        <p className="text-[#2f27ce] text-lg font-medium">
          Price: <span className="text-black text-sm">${21}</span>
        </p>
        <div className="flex gap-2">
          <Button
            variant="secondary"
            size="lg"
            text="Buy Now"
            onClick={handlePurchase}
          />
          <Button
            variant="cart"
            size="lg"
            text="Add To Cart"
            onClick={handleAddToCart}
          />
        </div>
      </div>
    </div>
  );
}
