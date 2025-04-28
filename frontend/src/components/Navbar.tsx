import { Cart } from "../icons/cart";
import { Logout } from "../icons/logout";
import { Button } from "../ui/Button";

export function Navbar() {
  return (
    <>
      <nav className="bg-yellow-200 h-full flex flex-row justify-between items-center px-5">
        <div>title</div>
        <div className="flex flex-row gap-5 items-center">
          <Cart size="md" />
          <p>my courses</p>
          <Button
            variant="secondary"
            size="md"
            text="Logout"
            icon={<Logout size="sm" />}
          ></Button>
        </div>
      </nav>
    </>
  );
}
