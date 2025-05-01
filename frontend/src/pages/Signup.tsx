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
    console.log("admin set to atom");
  }
  return (
    <>
      <div className="h-screen w-screen flex flex-row">
        <div className="w-[40%] flex flex-col items-center justify-center">
          <Hero />
        </div>
        <div className="w-[60%] flex flex-col justify-center items-center">
          <p>
            Sign up as{""} <span onClick={handleAdminClick}>admin</span> or{" "}
            <span onClick={handleUserClick}>learner</span>
          </p>
          {userAtom && <Form type="signup" user={userAtom} />}
        </div>
      </div>
    </>
  );
}
