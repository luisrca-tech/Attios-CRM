import type { ReactNode } from "react";

type AuthBackgroundProps = {
  children: ReactNode;
};

export function AuthBackground({ children }: AuthBackgroundProps) {
  return (
    <div className='lg:flex 2xl:max-w-[40.875rem] 3xl:max-w-full lg:max-w-[34rem] min-h-screen items-center justify-center bg-gradient-to-r from-primary-100 to-[#1B51E5] hidden'>
      <div className="z-10">{children}</div>
    </div>
  );
}