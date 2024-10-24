import type { ReactNode } from "react";

type AuthBackgroundProps = {
  children: ReactNode;
};

export function AuthBackground({ children }: AuthBackgroundProps) {
  return (
    <div className='flex max-w-[40.875rem] items-center justify-center bg-gradient-to-r from-primary-100 to-[#1B51E5]'>
      <div className="z-10">{children}</div>
    </div>
  );
}