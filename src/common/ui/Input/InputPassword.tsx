import { forwardRef, useState } from "react";
import { Icon } from "~/common/ui/Icons";
import InputText from "./InputText";

interface InputPasswordProps {
  className?: string;
  placeholder?: string;
}

const InputPassword = forwardRef<HTMLInputElement, InputPasswordProps>(
  ({ className, placeholder, ...rest }, ref) => {
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
      setShowPassword((prev) => !prev);
    };

    return (
      <div>
        <div className="relative">
          <InputText
            ref={ref}
            type={showPassword ? "text" : "password"}
            placeholder={placeholder}
            className={className}
            {...rest}
          />
          <div
            onClick={togglePasswordVisibility}
            className="absolute top-3 right-1 cursor-pointer"
          >
            {showPassword ? (
              <Icon.OpenPadlock className="w-[1.125rem] h-[1.125rem]" />
            ) : (
              <Icon.ClosePadlock className="w-[1.125rem] h-[1.125rem]" />
            )}
          </div>
        </div>
      </div>
    );
  }
);

export default InputPassword;
