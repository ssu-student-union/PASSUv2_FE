import type { ReactNode } from "react";
import type { FieldErrors, FieldValues } from "react-hook-form";

interface EventFormRowProps<T extends FieldValues, N extends keyof T> {
  label: string;
  children: ReactNode;
  error: FieldErrors<T>[N] | undefined;
}

export const EventFormRow = <T extends FieldValues, N extends keyof T>({
  label,
  error,
  children,
}: EventFormRowProps<T, N>) => {
  const message = error?.message;
  const showError = message && typeof message === "string";

  return (
    <div>
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
