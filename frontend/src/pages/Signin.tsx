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
      <div className="h-screen w-screen flex flex-row">
        <div className="w-[40%] flex flex-col items-center justify-center">
          <Hero />
        </div>
        <div className="w-[60%] flex flex-col justify-center items-center">
          {userAtom ? (
            <Form type="signin" user={userAtom} />
          ) : (
            <>
              <p>
                Sign in as{""} <span onClick={handleAdminClick}>admin</span> or{" "}
                <span onClick={handleUserClick}>learner</span>
                {userAtom && <Form type="signin" user={userAtom} />}
              </p>
            </>
          )}

          <p>
            Never visited? please create account{" "}
            <span onClick={handleClick}>here!</span>
          </p>
        </div>
      </div>
    </>
  );
}
