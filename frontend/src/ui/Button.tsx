import { ReactElement } from "react";

type Variant = "primary" | "secondary" | "buy";
type Size = "sm" | "md" | "lg";

type ButtonProps = React.ComponentPropsWithoutRef<"button"> & {
  variant: Variant;
  size: Size;
  text?: string;
  icon?: ReactElement;
};

const variantStyles = {
  primary: "bg-green-100",
  secondary: "bg-blue-100",
  buy: "bg-yellow-100",
};
const sizeStyles = {
  sm: "py-1 px-2 w-20",
  md: "py-1 px-3 w-30",
  lg: "py-2 px-4 w-40",
};

const defaultStyles: string = "rounded-md text-center cursor-pointer";
export function Button(props: ButtonProps) {
  return (
    <>
      <button
        className={`${variantStyles[props.variant]} ${
          sizeStyles[props.size]
        } ${defaultStyles}`}
        {...props}
      >
        <p className="flex flex-row items-center gap-2">
          {props.icon}
          {props.text}
        </p>
      </button>
    </>
  );
}
