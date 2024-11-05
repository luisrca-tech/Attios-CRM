interface WelcomeProps {
	title: string;
	subtitle: string;
}

export function WelcomeHeading({ title, subtitle }: WelcomeProps) {
	return (
		<div className="mt-3 mb-[3.875rem] flex flex-col gap-3 text-center lg:mt-0 lg:text-left">
			<h1 className="max-w-[25.2rem] font-bold text-3xl text-black leading-[2.625rem]">
				{title}
			</h1>
			<span className="font-normal text-sm leading-5">{subtitle}</span>
		</div>
	);
}
