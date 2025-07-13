export interface SidebarButton {
  label: string;
  icon: React.ReactNode;
  variant?: "default" | "outline";
  onClick: () => void;
}

export interface SidebarListItem {
  date: string;
  name: string;
  code: number;
}

export interface SidebarConfig {
  title: string;
  buttons: SidebarButton[];
  list?: SidebarListItem[];
}
