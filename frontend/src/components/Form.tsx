import { useRef } from "react";
import { Button } from "../ui/Button";
import { userSignin, userSignup } from "../api/userapi";
import { useNavigate } from "react-router-dom";

type FormProps = {
  type: "signup" | "signin";
};

const defaultFormStyles: string = " flex flex-col gap-3";
const defaultInputStyles: string =
  "h-10 outline-none p-2 border border-slate-200 rounded-md";

export function Form(props: FormProps) {
  const navigate = useNavigate();
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);

  async function handleSignupClick(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log("clicked");
    const username = usernameRef.current?.value;
    const name = nameRef.current?.value;
    const password = passwordRef.current?.value;
    console.log(username);
    if (username && password) {
      let body = { username, password, name };
      console.log(body);
      const data = await userSignup(body);
      if (data?.success === true) {
        //this data is returned by useFetch which can be null or {} so that is why .success was not working, so we
        //need to specufy to ts that what kind of data will be retunred fromm backend, I did specify now and
        //ts knows the data which is returned will have a success field in the object!!
        //VERY VERY IMPORTANT (GOOD WE NOTICED IT)
        navigate("/signin");
      }
    }
  }

  async function handleSigninClick(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log("clicked");
    const username = usernameRef.current?.value;
    const password = passwordRef.current?.value;
    if (username && password) {
      let body = { username, password };
      const data = await userSignin(body);
      if (data?.success === true) {
        //this data is returned by useFetch which can be null or {} so that is why .success was not working, so we
        //need to specufy to ts that what kind of data will be retunred fromm backend, I did specify now and
        //ts knows the data which is returned will have a success field in the object!!
        //VERY VERY IMPORTANT (GOOD WE NOTICED IT)
        const token = data?.token;
        if (token) {
          localStorage.setItem("token", token);
          navigate("/user/dashboard");
        }
      }
    }
  }
  return (
    <>
      <div className="w-[60%] flex justify-center items-center">
        <div className="bg-slate-100 w-85 max-h-90 flex flex-col gap-10 py-5 px-3 rounded-lg">
          <h4>Signup here to reach endless possibilities!</h4>

          {props.type === "signup" ? (
            <>
              <form onSubmit={handleSignupClick} className={defaultFormStyles}>
                <input
                  ref={nameRef}
                  placeholder="name"
                  className={defaultInputStyles}
                />
                <input
                  ref={usernameRef}
                  placeholder="username"
                  className={defaultInputStyles}
                />
                <input
                  ref={passwordRef}
                  placeholder="password"
                  className={defaultInputStyles}
                />
                <Button
                  variant="secondary"
                  size="lg"
                  text="Signup"
                  type="submit"
                />
              </form>
            </>
          ) : (
            <>
              <form onSubmit={handleSigninClick} className={defaultFormStyles}>
                <input
                  ref={usernameRef}
                  placeholder="username"
                  className={defaultInputStyles}
                />
                <input
                  ref={passwordRef}
                  placeholder="password"
                  className={defaultInputStyles}
                />
                <Button
                  variant="secondary"
                  size="lg"
                  text="Login"
                  type="submit"
                />
              </form>
            </>
          )}
        </div>
      </div>
    </>
  );
}
