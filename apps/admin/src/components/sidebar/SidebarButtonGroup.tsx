import type { ReactNode } from "react";

interface SidebarButtonGroupProps {
  children: ReactNode;
}

export const SidebarButtonGroup = ({ children }: SidebarButtonGroupProps) => {
  return <div className="flex flex-col gap-4">{children}</div>;
};
