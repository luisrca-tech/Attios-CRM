import { cn } from '~/lib/utils';
import { LinkButton } from './Button';

type NotFoundItemProps = {
	renderImage: () => React.ReactNode;
	title: string;
	description: string;
	textButton: string;
	className?: string;
	onClick?: () => void;
	href: string;
};

export function NotFoundItem({
	renderImage,
	title,
	description,
	textButton,
	className,
	onClick,
	href
}: NotFoundItemProps) {
	return (
		<div
			className={cn(
				'flex flex-col items-center justify-center gap-7 text-center',
				className
			)}
		>
			{renderImage()}
			<div className="flex flex-col gap-2 lg:gap-3">
				<strong className="text-2xl leading-[2.375rem] lg:text-3xl lg:leading-[2.65rem]">
					{title}
				</strong>
				<p className="font-normal text-primary-200 text-sm leading-5">
					{description}
				</p>
			</div>
			<LinkButton href={href} onClick={onClick}>
				{textButton}
			</LinkButton>
		</div>
	);
}
