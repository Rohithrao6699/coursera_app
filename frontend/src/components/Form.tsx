import { useRef } from "react";
import { Button } from "../ui/Button";
import { userSignin, userSignup } from "../api/userapi";
import { useNavigate } from "react-router-dom";
import { adminSignin, adminSignup } from "../api/adminapi";

type FormProps = {
  type: "signup" | "signin";
  user: string;
};

const defaultFormStyles: string = "flex flex-col gap-3";
const defaultInputStyles: string =
  "h-10 outline-none p-2 border border-zinc-300 rounded-md";

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

    if (props.user === "user") {
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
    } else {
      if (username && password) {
        let body = { username, password, name };
        console.log(body);
        const data = await adminSignup(body);
        if (data?.success === true) {
          //this data is returned by useFetch which can be null or {} so that is why .success was not working, so we
          //need to specufy to ts that what kind of data will be retunred fromm backend, I did specify now and
          //ts knows the data which is returned will have a success field in the object!!
          //VERY VERY IMPORTANT (GOOD WE NOTICED IT)
          navigate("/signin");
        }
      }
    }
  }

  async function handleSigninClick(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log("clicked");
    const username = usernameRef.current?.value;
    const password = passwordRef.current?.value;

    if (props.user === "user") {
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
    } else {
      if (username && password) {
        let body = { username, password };
        const data = await adminSignin(body);
        //switch with adminSignin api call
        if (data?.success === true) {
          //this data is returned by useFetch which can be null or {} so that is why .success was not working, so we
          //need to specufy to ts that what kind of data will be retunred fromm backend, I did specify now and
          //ts knows the data which is returned will have a success field in the object!!
          //VERY VERY IMPORTANT (GOOD WE NOTICED IT)
          const token = data?.token;
          if (token) {
            localStorage.setItem("token", token);
            navigate("/admin/Dashboard");
          }
        }
      }
    }
  }
  return (
    <>
      {/* <div className="w-[60%] flex justify-center items-center"> */}
      <div className="bg-zinc-100 w-85 max-h-90 flex flex-col gap-8 py-5 px-3 rounded-lg shadow-lg">
        {props.type === "signup" ? (
          <>
            <h4 className="text-base font-normal tracking-normal">
              Signup here to reach endless possibilities!
            </h4>
            <form onSubmit={handleSignupClick} className={defaultFormStyles}>
              <input
                ref={nameRef}
                placeholder="name"
                type="text"
                className={defaultInputStyles}
              />
              <input
                ref={usernameRef}
                placeholder="username"
                type="text"
                className={defaultInputStyles}
              />
              <input
                ref={passwordRef}
                placeholder="password"
                type="password"
                className={defaultInputStyles}
              />
              <Button variant="primary" size="lg" text="Signup" type="submit" />
            </form>
          </>
        ) : (
          <>
            <h4 className="text-base font-normal tracking-normal">
              Login to reach endless possibilities!
            </h4>
            <form onSubmit={handleSigninClick} className={defaultFormStyles}>
              <input
                ref={usernameRef}
                placeholder="username"
                type="text"
                className={defaultInputStyles}
              />
              <input
                ref={passwordRef}
                placeholder="password"
                type="password"
                className={defaultInputStyles}
              />
              <Button variant="primary" size="lg" text="Login" type="submit" />
            </form>
          </>
        )}
      </div>
      {/* </div> */}
    </>
  );
}
