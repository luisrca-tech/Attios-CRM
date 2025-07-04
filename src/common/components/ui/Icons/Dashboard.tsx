import type { IconProps } from '~/common/types/Icons.type';
import { cn } from '~/lib/utils';

export function DashboardIcon({ className, fill }: IconProps) {
	return (
		<svg
			className={cn(className)}
			width="22"
			height="22"
			viewBox="0 0 18 15"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<title>Dashboard icon</title>
			<path
				d="M9 0.375C7.51042 0.375 6.12109 0.754557 4.83203 1.51367C3.58594 2.22982 2.60482 3.21094 1.88867 4.45703C1.12956 5.74609 0.75 7.13542 0.75 8.625C0.75 9.59896 0.914714 10.5443 1.24414 11.4609C1.57357 12.3346 2.03906 13.1367 2.64062 13.8672L2.83398 14.125H15.166L15.3594 13.8672C15.9609 13.1367 16.4264 12.3346 16.7559 11.4609C17.0853 10.5443 17.25 9.59896 17.25 8.625C17.25 7.13542 16.8776 5.74609 16.1328 4.45703C15.4023 3.21094 14.4141 2.22982 13.168 1.51367C11.8789 0.754557 10.4896 0.375 9 0.375ZM9 1.75C10.2461 1.75 11.4062 2.0651 12.4805 2.69531C13.5117 3.29688 14.3281 4.11328 14.9297 5.14453C15.5599 6.21875 15.875 7.37891 15.875 8.625C15.875 9.38411 15.7461 10.1217 15.4883 10.8379C15.2448 11.5254 14.901 12.1628 14.457 12.75H3.54297C3.09896 12.1628 2.75521 11.5254 2.51172 10.8379C2.25391 10.1217 2.125 9.38411 2.125 8.625C2.125 7.37891 2.4401 6.21875 3.07031 5.14453C3.67188 4.11328 4.48828 3.29688 5.51953 2.69531C6.59375 2.0651 7.75391 1.75 9 1.75ZM9 2.4375C8.8138 2.4375 8.64909 2.50911 8.50586 2.65234C8.37695 2.78125 8.3125 2.9388 8.3125 3.125C8.3125 3.3112 8.37695 3.47591 8.50586 3.61914C8.64909 3.74805 8.8138 3.8125 9 3.8125C9.1862 3.8125 9.34375 3.74805 9.47266 3.61914C9.61589 3.47591 9.6875 3.3112 9.6875 3.125C9.6875 2.9388 9.61589 2.78125 9.47266 2.65234C9.34375 2.50911 9.1862 2.4375 9 2.4375ZM6.25 3.16797C6.0638 3.16797 5.89909 3.23958 5.75586 3.38281C5.62695 3.51172 5.5625 3.66927 5.5625 3.85547C5.5625 4.04167 5.62695 4.20638 5.75586 4.34961C5.89909 4.47852 6.0638 4.54297 6.25 4.54297C6.4362 4.54297 6.59375 4.47852 6.72266 4.34961C6.86589 4.20638 6.9375 4.04167 6.9375 3.85547C6.9375 3.66927 6.86589 3.51172 6.72266 3.38281C6.59375 3.23958 6.4362 3.16797 6.25 3.16797ZM11.75 3.16797C11.5638 3.16797 11.3991 3.23958 11.2559 3.38281C11.127 3.51172 11.0625 3.66927 11.0625 3.85547C11.0625 4.04167 11.127 4.20638 11.2559 4.34961C11.3991 4.47852 11.5638 4.54297 11.75 4.54297C11.9362 4.54297 12.0938 4.47852 12.2227 4.34961C12.3659 4.20638 12.4375 4.04167 12.4375 3.85547C12.4375 3.66927 12.3659 3.51172 12.2227 3.38281C12.0938 3.23958 11.9362 3.16797 11.75 3.16797ZM4.23047 5.1875C4.04427 5.1875 3.87956 5.25911 3.73633 5.40234C3.60742 5.53125 3.54297 5.6888 3.54297 5.875C3.54297 6.0612 3.60742 6.22591 3.73633 6.36914C3.87956 6.49805 4.04427 6.5625 4.23047 6.5625C4.41667 6.5625 4.57422 6.49805 4.70312 6.36914C4.84635 6.22591 4.91797 6.0612 4.91797 5.875C4.91797 5.6888 4.84635 5.53125 4.70312 5.40234C4.57422 5.25911 4.41667 5.1875 4.23047 5.1875ZM13.5762 5.20898L9.6875 7.44336C9.47266 7.31445 9.24349 7.25 9 7.25C8.61328 7.25 8.28385 7.38607 8.01172 7.6582C7.75391 7.91602 7.625 8.23828 7.625 8.625C7.625 9.01172 7.75391 9.34115 8.01172 9.61328C8.28385 9.87109 8.60612 10 8.97852 10C9.36523 10 9.69466 9.87109 9.9668 9.61328C10.2389 9.34115 10.375 9.01888 10.375 8.64648V8.625L14.2637 6.41211L13.5762 5.20898ZM3.5 7.9375C3.3138 7.9375 3.14909 8.00911 3.00586 8.15234C2.87695 8.28125 2.8125 8.4388 2.8125 8.625C2.8125 8.8112 2.87695 8.97591 3.00586 9.11914C3.14909 9.24805 3.3138 9.3125 3.5 9.3125C3.6862 9.3125 3.84375 9.24805 3.97266 9.11914C4.11589 8.97591 4.1875 8.8112 4.1875 8.625C4.1875 8.4388 4.11589 8.28125 3.97266 8.15234C3.84375 8.00911 3.6862 7.9375 3.5 7.9375ZM14.5 7.9375C14.3138 7.9375 14.1491 8.00911 14.0059 8.15234C13.877 8.28125 13.8125 8.4388 13.8125 8.625C13.8125 8.8112 13.877 8.97591 14.0059 9.11914C14.1491 9.24805 14.3138 9.3125 14.5 9.3125C14.6862 9.3125 14.8438 9.24805 14.9727 9.11914C15.1159 8.97591 15.1875 8.8112 15.1875 8.625C15.1875 8.4388 15.1159 8.28125 14.9727 8.15234C14.8438 8.00911 14.6862 7.9375 14.5 7.9375ZM4.23047 10.6875C4.04427 10.6875 3.87956 10.7591 3.73633 10.9023C3.60742 11.0312 3.54297 11.1888 3.54297 11.375C3.54297 11.5612 3.60742 11.7259 3.73633 11.8691C3.87956 11.998 4.04427 12.0625 4.23047 12.0625C4.41667 12.0625 4.57422 11.998 4.70312 11.8691C4.84635 11.7259 4.91797 11.5612 4.91797 11.375C4.91797 11.1888 4.84635 11.0312 4.70312 10.9023C4.57422 10.7591 4.41667 10.6875 4.23047 10.6875ZM13.7695 10.6875C13.5833 10.6875 13.4186 10.7591 13.2754 10.9023C13.1465 11.0312 13.082 11.1888 13.082 11.375C13.082 11.5612 13.1465 11.7259 13.2754 11.8691C13.4186 11.998 13.5833 12.0625 13.7695 12.0625C13.9557 12.0625 14.1133 11.998 14.2422 11.8691C14.3854 11.7259 14.457 11.5612 14.457 11.375C14.457 11.1888 14.3854 11.0312 14.2422 10.9023C14.1133 10.7591 13.9557 10.6875 13.7695 10.6875Z"
				fill={fill}
			/>
		</svg>
	);
}

DashboardIcon.displayName = 'DashboardIcon';
