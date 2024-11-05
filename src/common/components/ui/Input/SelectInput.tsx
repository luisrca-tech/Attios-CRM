'use client';

import type React from 'react';
import { useRef, useState } from 'react';
import { cn } from '../../../../lib/utils';
import useClickOutside from '../../../hooks/useClickOutside';

interface SelectInputProps {
	options: string[];
	text?: string;
	renderIcon?: (isOpen: boolean) => React.ReactNode;
	renderOptionIcon?: (option: string) => React.ReactNode;
}

const SelectInput: React.FC<SelectInputProps> = ({
	options,
	text,
	renderIcon,
	renderOptionIcon
}) => {
	const [isOpen, setIsOpen] = useState(false);
	const [selectedOption, setSelectedOption] = useState<string | null>(null);
	const ref = useRef<HTMLDivElement>(null);

	const toggleDropdown = () => setIsOpen(!isOpen);

	useClickOutside(ref, () => setIsOpen(false));

	return (
		<div
			ref={ref}
			className="relative inline-block w-full cursor-pointer text-left"
		>
			<button
				onClick={toggleDropdown}
				className={cn(
					'flex w-full items-center justify-between rounded border-none font-bold text-sm leading-5 outline-none',
					'placeholder:text-primary-200 hover:text-primary-100'
				)}
				type="button"
			>
				<span className="ml-2">{selectedOption || text}</span>
				{renderIcon?.(isOpen)}
			</button>
			{isOpen && (
				<div className="absolute mt-2 w-full rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5">
					<div className="py-1">
						{options.map((option) => (
							<button
								key={option}
								value={option}
								className={cn(
									'flex w-full items-center px-4 py-5 text-left text-sm',
									'hover:text-primary-100'
								)}
								onClick={() => {
									setSelectedOption(option);
									setIsOpen(false);
								}}
								type="button"
							>
								{renderOptionIcon?.(option)}
								<span className="ml-2">{option}</span>
							</button>
						))}
					</div>
				</div>
			)}
		</div>
	);
};

export default SelectInput;
