import type { ReactNode } from "react";

interface EventFormRowProps {
  label: string;
  children: ReactNode;
  error?: string;
}

export const EventFormRow = ({ label, error, children }: EventFormRowProps) => {
  return (
    <div>
      <div
        className={`
          flex w-full flex-col items-start justify-center
          sm:flex-row sm:gap-10
        `}
      >
        <label className="h-13 w-34 py-3 txt-h5">{label}</label>
        <div className={`h-full w-full flex-col`}>
          {children}
          {error && (
            <span className="mt-1 txt-body1 text-destructive">{error}</span>
          )}
        </div>
      </div>
    </div>
  );
};
