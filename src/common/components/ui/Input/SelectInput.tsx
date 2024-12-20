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
	const [isOpenDropdown, setIsOpenDropdown] = useState(false);
	const [selectedOption, setSelectedOption] = useState<string | null>(null);
	const ref = useRef<HTMLDivElement>(null);

	const toggleDropdown = () => setIsOpenDropdown((prev) => !prev);

	useClickOutside(ref, () => setIsOpenDropdown(false));
	
	const handleOptionClick = (option: string) => {
		setSelectedOption(option);
		toggleDropdown()
	};

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
				<span className="py-[0.375rem] text-primary-200 font-bold text-sm leading-5">{selectedOption || text}</span>
				<div className={cn('transition-all duration-300', isOpenDropdown ? 'rotate-180' : '')}>
				{renderIcon?.(isOpenDropdown)}
				</div>
			</button>
			{isOpenDropdown && (
				<div className="absolute mt-2 w-full rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 bg-white-100">
					<div className="py-1">
						{options.map((option) => (
							<button
								key={option}
								value={option}
								className={cn(
									'flex w-full items-center px-4 py-5 text-left text-sm hover:bg-primary-100/10',
									'hover:text-primary-100'
								)}
								onClick={() => handleOptionClick(option)}
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
