import type { ReactNode } from "react";

interface EventFormRowProps {
  label: string;
  children: ReactNode;
}

export const EventFormRow = ({ label, children }: EventFormRowProps) => {
  return (
    <div className="flex w-full items-start justify-center gap-10">
      <label className="h-13 w-34 py-3 txt-h5">{label}</label>
      <div className="h-full flex-1"> {children}</div>
    </div>
  );
};
