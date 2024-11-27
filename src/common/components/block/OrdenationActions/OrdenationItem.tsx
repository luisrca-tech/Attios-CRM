import { Icon } from '~/common/components/ui/Icons/_index';

type OrdenationItemProps = {
	label: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export function OrdenationItem({ label, ...props }: OrdenationItemProps) {
	return (
		<button
			className="flex items-center justify-between"
			type="button"
			key={label}
			{...props}
		>
			<span className="text-primary-200 text-xs leading-[1.125rem]">
				{label}
			</span>
			<Icon.Ordenation />
		</button>
	);
}
