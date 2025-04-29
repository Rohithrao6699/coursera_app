import { useNavigate } from "react-router-dom";
import { CartIcon } from "../icons/cart";
import { HomeIcon } from "../icons/home";
import { LogoutIcon } from "../icons/logout";
import { Button } from "../ui/Button";

export function Navbar() {
  const navigate = useNavigate();
  function handleHomeClick() {
    navigate("/user/dashboard");
  }
  function handleMyCourseClick() {
    navigate("mycourses");
  }
  return (
    <>
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
    </>
  );
}
