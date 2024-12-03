import { Button } from './Button';

type NotFoundProps = {
	renderImage: () => React.ReactNode;
	title: string;
	description: string;
	textButton: string;
};

export function NotFound({
	renderImage,
	title,
	description,
	textButton
}: NotFoundProps) {
	return (
		<div className="flex flex-col items-center justify-center gap-7 text-center">
			{renderImage()}
			<div className="flex flex-col gap-2 lg:gap-3">
				<strong className="text-2xl leading-[2.375rem] lg:text-3xl lg:leading-[2.65rem]">
					{title}
				</strong>
				<p className="font-normal text-primary-200 text-sm leading-5">
					{description}
				</p>
			</div>
			<Button>{textButton}</Button>
		</div>
	);
}
