import type { IconProps } from '~/common/types/Icons.type';
import { cn } from '~/lib/utils';

export function AquariusMetric({ className }: IconProps) {
	return (
		<svg
			className={cn(className)}
			width="18"
			height="16"
			viewBox="0 0 18 16"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<title>Aquarius Metric</title>
			<path
				d="M16.7129 0.445312L14.3066 3.45312L12.0508 2.31445L11.5137 2.05664L11.1699 2.55078L8.82812 6.07422L6.25 4.14062L3.34961 6.31055L0.921875 5.70898L0.578125 7.04102L3.65039 7.81445L6.25 5.85938L9.17188 8.05078L11.9863 3.83984L14.6934 5.17188L17.7871 1.30469L16.7129 0.445312ZM11.793 9.33984L11.2129 10.0703L8.87109 12.9922L6.25 11.0156L3.43555 13.1211L1.05078 11.9395L0.449219 13.1855L3.19922 14.5605L3.56445 14.7324L3.9082 14.4961L6.25 12.7344L8.5918 14.4961L9.12891 14.8828L11.6855 11.6816L13.9199 15.0117L14.457 15.7852L17.7871 11.6172L16.7129 10.7578L14.5645 13.4434L12.3301 10.1133L11.793 9.33984Z"
				fill="#FF808B"
			/>
		</svg>
	);
}

AquariusMetric.displayName = 'AquariusMetric';
