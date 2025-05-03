import { ReactElement } from "react";

type Variant = "primary" | "secondary" | "cart" | "delete" | "create";
type Size = "sm" | "md" | "lg";

type ButtonProps = React.ComponentPropsWithoutRef<"button"> & {
  variant: Variant;
  size: Size;
  text?: string;
  icon?: ReactElement;
  onClick?: () => void;
};

const variantStyles = {
  primary: "bg-[#dce1ff] hover:bg-[#2f27ce] hover:text-white", //login logout signup
  secondary: "bg-[#2f27ce] hover:bg-[#0e1c81] text-white", //buy now //add to cart
  cart: "bg-[#2f27ce] hover:bg-[#0e1c81] text-white",
  delete: "bg-red-200 hover:bg-red-400", //for deleting
  create: "bg-[#0b28f3] text-white hover:bg-[#0e1c81] hover:text-lg",
};
const sizeStyles = {
  sm: "py-1 px-1 min-w-20 text-sm",
  md: "py-1 px-3 min-w-30 max-w-40",
  lg: "py-2 px-4 w-40",
};

const defaultStyles: string = "rounded-md text-center cursor-pointer";
export function Button({
  variant,
  size,
  onClick,
  text,
  icon,
  ...rest
}: ButtonProps) {
  return (
    <>
      <button
        className={`${variantStyles[variant]} ${sizeStyles[size]} ${defaultStyles}`}
        {...rest}
        onClick={onClick}
      >
        <p className="flex flex-row items-center gap-2 font-normal tracking-wide">
          {icon}
          {text}
        </p>
      </button>
    </>
  );
}
