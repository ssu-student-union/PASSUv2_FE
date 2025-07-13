import type { ReactNode } from "react";

export interface SidebarLinkItem {
  type: "link";
  to: string;
  icon: ReactNode;
  label: string;
  variant?: "default" | "outline";
}

export interface SidebarActionItem {
  type: "action";
  onClick: () => void;
  icon: ReactNode;
  label: string;
  variant?: "default" | "outline";
}

export type SidebarButtonItem = SidebarLinkItem | SidebarActionItem;

export interface SidebarListItem {
  date: string;
  name: string;
  code: number;
}

export interface SidebarProps {
  buttons: SidebarButtonItem[];
  list?: SidebarListItem[];
}
