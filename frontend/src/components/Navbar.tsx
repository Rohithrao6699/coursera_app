import { useNavigate } from "react-router-dom";
import { CartIcon } from "../icons/cart";
import { HomeIcon } from "../icons/home";
import { LogoutIcon } from "../icons/logout";
import { Button } from "../ui/Button";
import { useRecoilValue } from "recoil";
import { CreateUserAtom } from "../store/CreateUserAtom";

export function Navbar() {
  const navigate = useNavigate();
  const userType = useRecoilValue(CreateUserAtom);
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
  return (
    <>
      {userType === "user" ? (
        <nav className="bg-yellow-200 h-full flex flex-row justify-between items-center px-5">
          <div>title</div>
          <div className="flex flex-row gap-5 items-center">
            <HomeIcon size="md" onclick={handleHomeClick} />
            <CartIcon size="md" />
            <p onClick={handleMyCourseClick}>my courses</p>
            <Button
              variant="secondary"
              size="md"
              text="Logout"
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
              icon={<LogoutIcon size="sm" />}
            ></Button>
          </div>
        </nav>
      )}
    </>
  );
}
