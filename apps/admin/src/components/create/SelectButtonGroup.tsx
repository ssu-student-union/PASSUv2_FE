import { Button } from "@passu/ui/button";
import { cn } from "@passu/ui/utils";
import { useState } from "react";

interface SelectButtonGroupProps<T extends readonly string[]> {
  options: T;
  value?: T[number][];
  onChange?: (value: T[number][]) => void;
}

export const SelectButtonGroup = <T extends readonly string[]>({
  options,
  value = [],
  onChange,
}: SelectButtonGroupProps<T>) => {
  const [selected, setSelected] = useState<T[number][]>(value);

  const handleClick = (option: T[number]) => {
    const updated = selected.includes(option)
      ? selected.filter((o) => o !== option)
      : [...selected, option];

    setSelected(updated);
    onChange?.(updated);
  };

  return (
    <div className="flex h-full items-center gap-4">
      {options.map((opt) => {
        const isSelected = selected.includes(opt);

        return (
          <Button
            key={opt}
            variant={isSelected ? "default" : "outline"}
            type="button"
            className={cn(
              "border-1",
              !isSelected &&
                `
                  bg-white text-hover
                  hover:text-hover
                `,
            )}
            size="rounded"
            onClick={() => handleClick(opt)}
          >
            {opt}
          </Button>
        );
      })}
    </div>
  );
};
