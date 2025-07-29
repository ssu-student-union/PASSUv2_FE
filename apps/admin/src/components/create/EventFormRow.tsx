import type { ReactNode } from "react";
import type { FieldErrors, FieldValues } from "react-hook-form";

interface EventFormRowProps<T extends FieldValues> {
  label: string;
  name: keyof T;
  children: ReactNode;
  errors: FieldErrors<T>;
}

export const EventFormRow = <T extends FieldValues>({
  label,
  name,
  errors,
  children,
}: EventFormRowProps<T>) => {
  const message = errors[name]?.message;
  const showError = message && typeof message === "string";
  return (
    <div className="">
      <div className="flex w-full items-start justify-center gap-10">
        <label className="h-13 w-34 py-3 txt-h5">{label}</label>
        <div className="h-full flex-1 flex-col">
          {children}
          {showError && (
            <span className="mt-1 txt-body1 text-destructive">{message}</span>
          )}
        </div>
      </div>
    </div>
  );
};
