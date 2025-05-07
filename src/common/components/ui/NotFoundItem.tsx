import { cn } from '~/lib/utils';
import { Button, LinkButton } from './Button';
import { selectedAddAction } from '~/common/atoms/selected-add-action';
import { useAtom } from 'jotai';

type NotFoundItemProps = {
	renderImage: () => React.ReactNode;
	title: string;
	description: string;
	textButton: string;
	className?: string;
	renderModal?: () => React.ReactNode;
	href: string;
	resetFilters?: () => void;
};

export function NotFoundItem({
	renderImage,
	title,
	description,
	textButton,
	className,
	href,
	renderModal,
	resetFilters
}: NotFoundItemProps) {
	const [selectedModal, setSelectedModal] = useAtom(selectedAddAction);

	return (
		<>
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
				<div className="hidden items-center gap-3 lg:flex">
					<Button
						type="button"
						onClick={() => setSelectedModal(renderModal?.())}
					>
						{textButton}
					</Button>
					{resetFilters && (
						<Button type="button" variant="outlined" onClick={resetFilters}>
							Reset Filters
						</Button>
					)}
				</div>
				<LinkButton href={href} className="block lg:hidden">
					{textButton}
				</LinkButton>
			</div>
			{selectedModal && renderModal?.()}
		</>
	);
}
