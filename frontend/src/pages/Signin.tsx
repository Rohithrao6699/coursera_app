import { useNavigate } from "react-router-dom";
import { Form } from "../components/Form";
import { Hero } from "../components/Hero";
import { useRecoilState } from "recoil";
import { CreateUserAtom } from "../store/CreateUserAtom";

export function Signin() {
  const navigate = useNavigate();
  const [userAtom, setUserAtom] = useRecoilState(CreateUserAtom);

  console.log(userAtom);
  function handleClick() {
    navigate("/signup");
  }

  function handleAdminClick() {
    console.log("admin set to atom");
    setUserAtom("admin");
  }
  function handleUserClick() {
    console.log("user set to atom");
    setUserAtom("user");
  }
  return (
    <>
      <div className="h-full flex flex-row">
        <div className="w-[50%] flex flex-col items-center justify-center">
          <Hero />
        </div>
        <div className="w-[50%] flex flex-col justify-center items-center">
          {userAtom ? (
            <Form type="signin" user={userAtom} />
          ) : (
            <>
              <p className="font-normal text-lg my-2">
                Login as{""}{" "}
                <span
                  onClick={handleAdminClick}
                  className="text-xl underline decoration-dotted cursor-pointer  hover:font-medium hover:text-2xl text-[#2f27ce]"
                >
                  admin
                </span>{" "}
                or{" "}
                <span
                  onClick={handleUserClick}
                  className="text-xl underline decoration-dotted cursor-pointer hover:font-medium hover:text-2xl text-[#2f27ce]"
                >
                  learner
                </span>
                {userAtom && <Form type="signin" user={userAtom} />}
              </p>
            </>
          )}

          <p className="my-3 py-2">
            Never visited? please create account{" "}
            <span
              onClick={handleClick}
              className="text-lg underline decoration-dotted cursor-pointer hover:font-medium hover:text-[#2f27ce]"
            >
              here!
            </span>
          </p>
        </div>
      </div>
    </>
  );
}
