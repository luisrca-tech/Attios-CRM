import type { IconProps } from '~/common/types/Icons.type';
import { cn } from '~/lib/utils';

export function ReportsIcon({ className, fill }: IconProps) {
	return (
		<svg
			className={cn(className)}
			width="22"
			height="22"
			viewBox="0 0 18 17"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<title>Reports icon</title>
			<path
				d="M17.25 0.542969L16.1328 1.40234L12.9531 3.89453L8.84961 3.20703L4.70312 5.95703L1.56641 5.33398L0.75 5.16211V17H17.25V0.542969ZM15.875 3.35742V7.05273L12.9746 9.35156L8.89258 7.99805L8.61328 8.16992L4.78906 10.7266L2.125 9.65234V6.83789L4.74609 7.35352L5.02539 7.41797L9.15039 4.66797L13.0176 5.3125L13.3184 5.35547L13.5547 5.16211L15.875 3.35742ZM15.875 8.81445V15.625H2.125V11.1562L4.96094 12.2734L9.12891 9.50195L12.9102 10.7695L13.2539 10.8984L13.5547 10.6621L15.875 8.81445Z"
				fill={fill}
			/>
		</svg>
	);
}

ReportsIcon.displayName = 'ReportsIcon';
