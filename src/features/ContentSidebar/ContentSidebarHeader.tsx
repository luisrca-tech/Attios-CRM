import Image from 'next/image';
import { cn } from '~/lib/utils';
import { Button } from '../../common/components/ui/Button';
import { Icon } from '../../common/components/ui/Icons';
import Logo from '/public/favicon.svg';

interface ContentSidebarHeaderProps {
	isOpen: boolean;
	onToggleSidebar: (isOpen: boolean) => void;
	className?: string;
}

export function ContentSidebarHeader({
	isOpen,
	onToggleSidebar,
	className
}: ContentSidebarHeaderProps) {
	const handleToggleSidebar = () => {
		onToggleSidebar(!isOpen);
	};

	return (
		<div
			className={cn(
				'flex min-w-[20.625rem] items-center justify-between pb-8',
				className
			)}
		>
			<div className="flex gap-3">
				<Image src={Logo} alt="logo" width={30} height={30} />
				<div className="flex flex-col">
					<h1 className="font-bold text-black text-sm leading-5">Attios CRM</h1>
					<span className="font-normal text-primary-200 text-xs leading-[1.125rem]">
						8484 Rooss Wells
					</span>
				</div>
			</div>
			<Button
				onClick={handleToggleSidebar}
				className="h-9 w-9 bg-primary-200/10 p-0 hover:bg-primary-200/50"
				color="secondary"
			>
				<Icon.Arrow.Down
					className={cn(
						'h-2 w-2 transition-transform duration-300',
						isOpen ? 'rotate-90' : 'rotate-360'
					)}
				/>
			</Button>
		</div>
	);
}
