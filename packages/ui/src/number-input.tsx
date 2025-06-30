import { Minus, Plus } from "lucide-react";

import { Button } from "./button";
import { Input } from "./input";
import { cn } from "./utils";
import { useEffect, useRef, useState } from "react";

interface NumberInputProps extends Omit<React.ComponentProps<"input">, "type"> {
  min?: number;
  max?: number;
  step?: number;
  onValueChange?: (value: number | undefined) => void;
}

function NumberInput({
  className,
  min,
  max,
  step = 1,
  value,
  defaultValue,
  onValueChange,
  onChange,
  disabled,
  ...props
}: NumberInputProps) {
  const [internalValue, setInternalValue] = useState<string>(
    value?.toString() ?? defaultValue?.toString() ?? ""
  );

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (value !== undefined) {
      setInternalValue(value.toString());
    }
  }, [value]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInternalValue(newValue);

    const numericValue = newValue === "" ? undefined : parseFloat(newValue);
    onValueChange?.(numericValue);
    onChange?.(e);
  };

  const handleIncrement = () => {
    if (disabled) return;

    const currentValue = parseFloat(internalValue) || 0;
    const newValue = currentValue + step;

    if (max !== undefined && newValue > max) return;

    const stringValue = newValue.toString();
    setInternalValue(stringValue);
    onValueChange?.(newValue);

    // Create synthetic event for onChange
    if (onChange && inputRef.current) {
      const syntheticEvent = {
        target: { ...inputRef.current, value: stringValue },
        currentTarget: inputRef.current,
      } as React.ChangeEvent<HTMLInputElement>;
      onChange(syntheticEvent);
    }
  };

  const handleDecrement = () => {
    if (disabled) return;

    const currentValue = parseFloat(internalValue) || 0;
    const newValue = currentValue - step;

    if (min !== undefined && newValue < min) return;

    const stringValue = newValue.toString();
    setInternalValue(stringValue);
    onValueChange?.(newValue);

    // Create synthetic event for onChange
    if (onChange && inputRef.current) {
      const syntheticEvent = {
        target: { ...inputRef.current, value: stringValue },
        currentTarget: inputRef.current,
      } as React.ChangeEvent<HTMLInputElement>;
      onChange(syntheticEvent);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      handleIncrement();
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      handleDecrement();
    }
  };

  return (
    <div
      className={cn(
        "inline-flex items-center bg-white border border-primary rounded-full h-12 overflow-hidden",
        "focus-within:ring-2 focus-within:ring-primary/20",
        disabled && "opacity-50 pointer-events-none",
        className
      )}
      data-slot="number-input"
    >
      {/* Decrement Button */}
      <Button
        type="button"
        variant="ghost"
        size="icon"
        onClick={handleDecrement}
        disabled={
          disabled ?? (min !== undefined && parseFloat(internalValue) <= min)
        }
        className={cn("w-8 mx-1 rounded-full text-primary", "active:scale-95")}
        aria-label="감소"
        tabIndex={disabled ? -1 : 0}
      >
        <Minus className="size-4" />
      </Button>

      {/* Input Field */}
      <div className="flex-1 relative">
        <Input
          ref={inputRef}
          type="number"
          value={internalValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          min={min}
          max={max}
          step={step}
          disabled={disabled}
          className={cn(
            "h-8 text-center border-0 border-b border-gray-300 rounded-tl-lg rounded-tr-lg bg-transparent",
            "focus-visible:border-primary focus-visible:bg-white focus-visible:ring-0",
            // Hide native number input spinners - more comprehensive approach
            "[appearance:textfield]",
            "[&::-webkit-outer-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0",
            "[&::-webkit-inner-spin-button]:appearance-none [&::-webkit-inner-spin-button]:m-0"
          )}
          style={
            {
              MozAppearance: "textfield",
            } as React.CSSProperties
          }
          {...props}
        />
      </div>

      {/* Increment Button */}
      <Button
        type="button"
        variant="ghost"
        size="icon"
        onClick={handleIncrement}
        disabled={
          disabled ?? (max !== undefined && parseFloat(internalValue) >= max)
        }
        className={cn(
          "w-8 h-8 mx-1 rounded-full text-primary",
          "active:scale-95"
        )}
        aria-label="증가"
        tabIndex={disabled ? -1 : 0}
      >
        <Plus className="size-4" />
      </Button>
    </div>
  );
}

export { NumberInput };
