import { Button } from "@passu/ui/button";
import { cn } from "@passu/ui/utils";
import { useState } from "react";

interface SelectButtonGroupProps {
  options: string[];
  value?: string[];
  onChange?: (value: string[]) => void;
}

export const SelectButtonGroup = ({
  options,
  value = [],
  onChange,
}: SelectButtonGroupProps) => {
  const [selected, setSelected] = useState<string[]>(value);

  const handleClick = (option: string) => {
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
