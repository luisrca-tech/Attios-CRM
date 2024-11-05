type AuthBackgroundProps = {
	image: string;
};

export function AuthBackground({ image }: AuthBackgroundProps) {
	return (
		<div className="hidden min-h-screen 3xl:max-w-full items-center justify-center bg-gradient-to-r from-primary-100 to-[#1B51E5] lg:flex lg:max-w-[34rem] 2xl:max-w-[40.875rem]">
			<div className="z-10">
				<img src={image} alt="Auth background" />
			</div>
		</div>
	);
}
