import autoAnimate from '@formkit/auto-animate';
import { useEffect, useRef } from 'react';

type Props = {
	children?: React.ReactNode;
};

export default function ErrorMessage({ children }: Props) {
	const parent = useRef(null);

	useEffect(() => {
		parent.current && autoAnimate(parent.current);
	}, [parent]);

	return (
		<div ref={parent}>
			{children && (
				<p className="font-bold text-secondary-300 text-sm">{children}</p>
			)}
		</div>
	);
}
