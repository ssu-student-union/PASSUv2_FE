import { Button } from "@passu/ui/button";
import { cn } from "@passu/ui/utils";
import { useState } from "react";

interface SelectButtonGroupProps {
  options: string[];
  defaultValue?: string[];
}

export const SelectButtonGroup = ({
  options,
  defaultValue = [],
}: SelectButtonGroupProps) => {
  const [selected, setSelected] = useState<string[]>(defaultValue);

  const handleClick = (option: string) => {
    setSelected((prev) =>
      prev.includes(option)
        ? prev.filter((o) => o !== option)
        : [...prev, option],
    );
  };
  return (
    <div className="flex h-full items-center gap-4">
      {options.map((opt) => {
        const isSelected = selected.includes(opt);

        return (
          <Button
            key={opt}
            variant={isSelected ? "default" : "outline"}
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
