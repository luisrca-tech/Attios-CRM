import React, { type ReactNode } from 'react';
import { cn } from '~/lib/utils';

interface InputText {
	className?: string;
	renderIconLeft?: () => ReactNode;
	renderIconRight?: () => ReactNode;
}

const InputText = React.forwardRef<
	HTMLInputElement,
	React.InputHTMLAttributes<HTMLInputElement> & InputText
>(({ renderIconLeft, renderIconRight, className, ...rest }, ref) => {
	return (
		<div className="relative">
			{renderIconLeft && (
				<div className="absolute top-3">{renderIconLeft()}</div>
			)}
			<input
				className={cn(
					'h-full w-full p-2 font-bold text-black text-sm leading-5 placeholder:text-primary-200 focus:border-white-400 focus:outline-white-400',
					className
				)}
				ref={ref}
				{...rest}
			/>
			{renderIconRight && (
				<div className="absolute top-3 right-1">{renderIconRight()}</div>
			)}
		</div>
	);
});

export default InputText;
