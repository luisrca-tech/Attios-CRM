import React from "react";

const SelectInput = React.forwardRef<
  HTMLSelectElement,
  React.SelectHTMLAttributes<HTMLSelectElement>
>(({ children, ...rest }, ref) => {
  return (
    <select
      className='rounded border-none pl-4 font-bold text-black text-sm leading-5 outline-none placeholder:text-primary-200 hover:text-primary-100'
      ref={ref}
      {...rest}
    >
      {children}
    </select>
  );
});

export default SelectInput;
