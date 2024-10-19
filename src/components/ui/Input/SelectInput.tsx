"use client";

import type React from "react";
import { useEffect, useRef, useState } from "react";

interface SelectInputProps {
  options: string[];
  text?: string;
  iconLeft?: React.ReactNode;
}

const SelectInput: React.FC<SelectInputProps> = ({
  options,
  text,
  iconLeft,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => setIsOpen(!isOpen);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={ref} className="relative inline-block text-left">
      <button
        onClick={toggleDropdown}
        className="rounded border-none font-bold text-black text-sm leading-5 outline-none placeholder:text-primary-200 hover:text-primary-100"
        type="button"
      >
        {selectedOption || text}
      </button>
      {isOpen && (
        <div className="absolute mt-2 w-full rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5">
          <div className="py-1">
            {options.map((option) => (
              <button
                key={option}
                value={option}
                className="flex w-full items-center px-4 py-5 text-left text-black text-sm hover:text-primary-100"
                onClick={() => {
                  setSelectedOption(option);
                  setIsOpen(false);
                }}
                type="button"
              >
                {iconLeft && <div className="mr-2">{iconLeft}</div>}
                {option}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SelectInput;
