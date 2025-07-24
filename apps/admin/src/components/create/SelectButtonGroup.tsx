import { Button } from "@passu/ui/button";
import { useState } from "react";

interface SelectButtonGroupProps {
  options: string[];
  multiple?: boolean;
  defaultValue?: string[];
}

export const SelectButtonGroup = ({
  options,
  multiple = false,
  defaultValue = [],
}: SelectButtonGroupProps) => {
  const [selected, setSelected] = useState<string[]>(defaultValue);

  const handleClick = (option: string) => {
    if (multiple) {
      setSelected((prev) =>
        prev.includes(option)
          ? prev.filter((o) => o !== option)
          : [...prev, option],
      );
    } else {
      setSelected([option]);
    }
  };
  return (
    <div className="flex h-full items-center gap-4">
      {options.map((opt) => (
        <Button
          key={opt}
          variant={selected.includes(opt) ? "default" : "outline"}
          size="rounded"
          onClick={() => handleClick(opt)}
          className="h-12 w-23 txt-subtitle1"
        >
          {opt}
        </Button>
      ))}
    </div>
  );
};
