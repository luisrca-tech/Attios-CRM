interface WelcomeProps {
  title: string;
  subtitle: string;
}

export function WelcomeHeading({ title, subtitle }: WelcomeProps) {
  return (
    <div className="flex flex-col gap-3 mb-[3.875rem] text-center lg:text-left mt-3 lg:mt-0">
      <h1 className="max-w-[25.2rem] font-bold text-3xl text-black leading-[2.625rem]">
        {title}
      </h1>
      <span className="font-normal text-sm leading-5">{subtitle}</span>
    </div>
  );
}
