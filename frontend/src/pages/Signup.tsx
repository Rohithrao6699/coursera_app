import { Hero } from "../components/Hero";
import { Form } from "../components/Form";
import { useRecoilState } from "recoil";
import { CreateUserAtom } from "../store/CreateUserAtom";

export function Signup() {
  const [userAtom, setUserAtom] = useRecoilState(CreateUserAtom);
  function handleAdminClick() {
    setUserAtom("admin");
    console.log("admin set to atom");
  }
  function handleUserClick() {
    setUserAtom("user");
    console.log("user set to atom");
  }
  return (
    <>
      <div className="h-full w-screen flex flex-row">
        <div className="w-[50%] flex flex-col items-center justify-center">
          <Hero />
        </div>
        {userAtom ? (
          <div className="w-[50%] flex flex-col justify-center items-center">
            <Form type="signup" user={userAtom} />
          </div>
        ) : (
          <div className="w-[60%] flex flex-col justify-center items-center">
            <p>
              Sign up as{""}{" "}
              <span
                onClick={handleAdminClick}
                className="text-xl underline decoration-dotted cursor-pointer hover:font-medium hover:text-2xl text-[#2f27ce]"
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
            </p>
            {/* {userAtom && <Form type="signup" user={userAtom} />} */}
          </div>
        )}
      </div>
    </>
  );
}
