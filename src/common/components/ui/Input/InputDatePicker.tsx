"use client";

import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { Button } from "../Button";
import { Calendar } from "../calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../popover";
import { cn } from "~/lib/utils";

interface InputDatePickerProps {
  value?: Date;
  onChange?: (date: Date | undefined) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  renderIconLeft?: () => React.ReactNode;
  renderIconRight?: () => React.ReactNode;
}

const InputDatePicker = React.forwardRef<HTMLButtonElement, InputDatePickerProps>(
  (
    {
      value,
      onChange,
      placeholder = "Pick a date",
      disabled = false,
      className,
      renderIconLeft,
      renderIconRight,
    },
    ref
  ) => {
    const [open, setOpen] = React.useState(false);

    const handleSelect = (date: Date | undefined) => {
      onChange?.(date);
      setOpen(false);
    };

    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            ref={ref}
            variant="filled"
            color="septenary"
            className={cn(
              "w-full justify-start text-left font-normal border-none shadow-none",
              !value && "text-muted-foreground",
              className
            )}
            disabled={disabled}
          >
            <div className="flex w-full items-center justify-between">
              <div className="flex items-center">
                {renderIconLeft?.()}
                {value ? format(value, "PPP") : placeholder}
              </div>
              <div className="flex items-center">
                {renderIconRight?.() || <CalendarIcon className="h-3 w-3" />}
              </div>
            </div>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0 bg-white-100" align="start">
          <Calendar
            mode="single"
            selected={value}
            onSelect={handleSelect}
          />
        </PopoverContent>
      </Popover>
    );
  }
);

InputDatePicker.displayName = "InputDatePicker";

export default InputDatePicker;
