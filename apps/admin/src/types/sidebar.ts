import type { ReactNode } from "react";

export interface SidebarButton {
  label: string;
  icon: ReactNode;
  variant?: "default" | "outline";
  onClick: () => void;
}

export interface SidebarListItem {
  date: string;
  name: string;
  code: number;
}

export interface SidebarProps {
  buttons: SidebarButton[];
  list?: SidebarListItem[];
}
