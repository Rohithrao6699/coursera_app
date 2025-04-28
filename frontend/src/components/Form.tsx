import { Button } from "../ui/Button";

type FormProps = React.ComponentPropsWithoutRef<"form"> & {
  type: "signup" | "signin";
};

const defaultFormStyles: string = " flex flex-col gap-3";
const defaultInputStyles: string =
  "h-10 outline-none p-2 border border-slate-200 rounded-md";
export function Form(props: FormProps) {
  return (
    <>
      <div className="w-[60%] flex justify-center items-center">
        <div className="bg-slate-100 w-85 max-h-90 flex flex-col gap-10 py-5 px-3 rounded-lg">
          <h4>Signup here to reach endless possibilities!</h4>
          <form {...props} className={defaultFormStyles}>
            {props.type === "signup" ? (
              <>
                <input placeholder="name" className={defaultInputStyles} />
                <input placeholder="username" className={defaultInputStyles} />
                <input placeholder="password" className={defaultInputStyles} />
                <Button variant="secondary" size="lg" text="Signup" />
              </>
            ) : (
              <>
                <input placeholder="username" className={defaultInputStyles} />
                <input placeholder="password" className={defaultInputStyles} />
                <Button variant="secondary" size="lg" text="Login" />
              </>
            )}
          </form>
        </div>
      </div>
    </>
  );
}
