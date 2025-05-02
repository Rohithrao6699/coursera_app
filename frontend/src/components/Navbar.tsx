import { useNavigate } from "react-router-dom";
import { CartIcon } from "../icons/cart";
import { HomeIcon } from "../icons/home";
import { LogoutIcon } from "../icons/logout";
import { Button } from "../ui/Button";
import { useRecoilState, useSetRecoilState } from "recoil";
import { CreateUserAtom } from "../store/CreateUserAtom";
import { UserCoursesAtom } from "../store/userStore/UserCourseAtom";
import { CartCoursesAtom } from "../store/userStore/UserCasrtAtom";
import { AllCoursesAtom } from "../store/userStore/AllCoursesAtom";
import { AdminCoursesAtom } from "../store/adminStore/AllCoursesAtom";

export function Navbar() {
  const navigate = useNavigate();
  const [userType, setUserType] = useRecoilState(CreateUserAtom);
  const setUserCourseAtom = useSetRecoilState(UserCoursesAtom);
  const setCartCoursesAtom = useSetRecoilState(CartCoursesAtom);
  const setAllCoursesAtom = useSetRecoilState(AllCoursesAtom);
  const setAdminCoursesAtom = useSetRecoilState(AdminCoursesAtom);
  //
  function handleHomeClick() {
    if (userType) {
      if (userType === "user") {
        navigate("/user/dashboard");
      } else {
        navigate("/admin/dashboard");
      }
    }
  }
  function handleMyCourseClick() {
    navigate("mycourses");
  }
  function handleLogout() {
    // UserCoursesAtom []
    //CartCoursesAtom []
    //AllCoursesAtom []
    //AdminCoursesAtom []
    localStorage.clear();
    setUserType(null);
    setUserCourseAtom([]);
    setCartCoursesAtom([]);
    setAllCoursesAtom([]);
    setAdminCoursesAtom([]);
    console.log("logout clicked");
    navigate("/signin");
  }
  function handleCartClick() {
    navigate("cart");
  }
  return (
    <>
      {userType === "user" ? (
        <nav className="bg-yellow-200 h-full flex flex-row justify-between items-center px-5">
          <div>title</div>
          <div className="flex flex-row gap-5 items-center">
            <HomeIcon size="md" onclick={handleHomeClick} />
            <CartIcon size="md" onclick={handleCartClick} />
            <p onClick={handleMyCourseClick}>my courses</p>
            <Button
              variant="secondary"
              size="md"
              text="Logout"
              onClick={handleLogout}
              icon={<LogoutIcon size="sm" />}
            ></Button>
          </div>
        </nav>
      ) : (
        <nav className="bg-yellow-200 h-full flex flex-row justify-between items-center px-5">
          <div>title</div>
          <div className="flex flex-row gap-5 items-center">
            <HomeIcon size="md" onclick={handleHomeClick} />
            <Button
              variant="secondary"
              size="md"
              text="Logout"
              onClick={handleLogout}
              icon={<LogoutIcon size="sm" />}
            ></Button>
          </div>
        </nav>
      )}
    </>
  );
}
