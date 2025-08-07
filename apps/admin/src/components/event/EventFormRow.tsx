import type { ReactNode } from "react";

interface EventFormRowProps {
  label: string;
  children: ReactNode;
  error?: string;
}

export const EventFormRow = ({ label, error, children }: EventFormRowProps) => {
  return (
    <div>
      <div className="flex w-full items-start justify-center gap-10">
        <label className="h-13 w-34 py-3 txt-h5">{label}</label>
        <div className="h-full flex-1 flex-col">
          {children}
          {error && (
            <span className="mt-1 txt-body1 text-destructive">{error}</span>
          )}
        </div>
      </div>
    </div>
  );
};
