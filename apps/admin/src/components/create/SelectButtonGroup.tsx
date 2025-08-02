import { Button } from "@passu/ui/button";
import { cn } from "@passu/ui/utils";

interface Option {
  label: string;
  value: string;
}

interface SelectButtonGroupProps<T extends Option> {
  options: readonly T[];
  value?: T[];
  onChange?: (value: T[]) => void;
}

export const SelectButtonGroup = <T extends Option>({
  options,
  value = [],
  onChange,
}: SelectButtonGroupProps<T>) => {
  const handleClick = (option: T) => {
    const isSelected = value.some((v) => v.value === option.value);
    const updated = isSelected
      ? value.filter((v) => v.value !== option.value)
      : [...value, option];
    onChange?.(updated);
  };

  return (
    <div className="flex h-full items-center gap-4">
      {options.map((opt) => {
        const isSelected = value.some((v) => v.value === opt.value);

        return (
          <Button
            key={opt.value}
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
            {opt.label}
          </Button>
        );
      })}
    </div>
  );
};
