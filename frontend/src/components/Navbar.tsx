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
    setUserType(null);
    localStorage.clear();
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
        <nav className="border-b-1 border-slate-300 h-full flex flex-row justify-between items-center px-5">
          <div className="text-2xl font-bold text-[#2f27ce]">Coursera</div>
          <div className="flex flex-row gap-7 items-center">
            <HomeIcon size="md" onclick={handleHomeClick} />
            <CartIcon size="md" onclick={handleCartClick} />
            <p
              onClick={handleMyCourseClick}
              className="cursor-pointer text-lg text-black hover:text-[#2f27ce]"
            >
              My Courses
            </p>
            <Button
              variant="primary"
              size="md"
              text="Logout"
              onClick={handleLogout}
              icon={<LogoutIcon size="sm" />}
            ></Button>
          </div>
        </nav>
      ) : (
        <nav className="border-b-1 border-slate-300 h-full flex flex-row justify-between items-center px-5">
          <div className="text-2xl font-bold text-[#2f27ce]">Coursera</div>
          <div className="flex flex-row gap-8 items-center">
            <HomeIcon size="md" onclick={handleHomeClick} />
            <Button
              variant="primary"
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
