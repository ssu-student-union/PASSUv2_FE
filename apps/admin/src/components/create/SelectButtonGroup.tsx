import { Button } from "@passu/ui/button";
import { cn } from "@passu/ui/utils";

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
  const handleClick = (option: T[number]) => {
    const updated = value.includes(option)
      ? value.filter((o) => o !== option)
      : [...value, option];
    onChange?.(updated);
  };

  return (
    <div className="flex h-full items-center gap-4">
      {options.map((opt) => {
        const isSelected = value.includes(opt);

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
