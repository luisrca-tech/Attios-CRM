'use client';

import * as React from 'react';
import { Button } from '../Button';
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList
} from '../command';
import { Icon } from '../Icons/_index';
import { Popover, PopoverContent, PopoverTrigger } from '../popover';

interface SelectInputProps {
	options: string[];
	text?: string;
	onSearch: (value: string) => void;
	onChange: (value: string) => void;
	onAdd: (value: string) => void;
}

const SelectInput = React.forwardRef<HTMLButtonElement, SelectInputProps>(
	({ text, options, onSearch, onChange, onAdd }, ref) => {
		const [open, setOpen] = React.useState(false);
		const [value, setValue] = React.useState('');
		const [searchValue, setSearchValue] = React.useState('');

		const handleSelect = React.useCallback(
			(currentValue: string) => {
				setValue(currentValue);
				setSearchValue(currentValue);
				setOpen(false);
				onChange?.(currentValue);
			},
			[onChange]
		);

		const handleSearch = (search: string) => {
			setSearchValue(search);
			onSearch?.(search);
		};

		return (
			<Popover open={open} onOpenChange={setOpen}>
				<PopoverTrigger
					className="flex w-full items-center justify-between"
					asChild
				>
					<button
						ref={ref}
						role="combobox"
						aria-expanded={open}
						className="w-[16.8125rem] justify-between py-1 font-normal"
						type="button"
					>
						{value ? options.find((option) => option === value) : text}
						<Icon.Arrow.Down className="ml-2 h-3 w-3 shrink-0" />
					</button>
				</PopoverTrigger>
				<PopoverContent
					className="w-[16.8125rem] p-0"
					align="start"
					side="top"
					sideOffset={4}
				>
					<Command className="bg-white-100 text-black">
						<CommandInput
							placeholder="Search..."
							value={searchValue}
							onValueChange={handleSearch}
							className="h-9 px-3"
						/>
						<CommandList>
							<CommandEmpty className="flex flex-col items-center justify-center gap-2">
								No option found!
								<Button onClick={() => onAdd?.(searchValue)}>
									Add "{searchValue}"
								</Button>
							</CommandEmpty>

							<CommandGroup className="bg-white-100 font-bold text-black">
								{options.map((option) => (
									<CommandItem
										key={option}
										value={option}
										onSelect={handleSelect}
										className="cursor-pointer hover:bg-primary-100 hover:text-white-100"
									>
										{option}
									</CommandItem>
								))}
							</CommandGroup>
						</CommandList>
					</Command>
				</PopoverContent>
			</Popover>
		);
	}
);

SelectInput.displayName = 'SelectInput';

export default SelectInput;
