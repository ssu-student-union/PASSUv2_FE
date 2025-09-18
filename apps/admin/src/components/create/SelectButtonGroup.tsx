import { Button } from "@passu/ui/button";
import { cn } from "@passu/ui/utils";

interface Option<T> {
  label: string;
  value: T;
}

interface SelectButtonGroupProps<T> {
  options: readonly Option<T>[];
  value?: Option<T>[];
  onChange?: (value: Option<T>[]) => void;
}
export const SelectButtonGroup = <T,>({
  options,
  value = [],
  onChange,
}: SelectButtonGroupProps<T>) => {
  const handleClick = (option: Option<T>) => {
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
            key={opt.label}
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
