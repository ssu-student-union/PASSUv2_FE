import Sidebar from "@/components/common/Sidebar";
import type { SidebarProps } from "@/types/sidebar";
import type { ReactNode } from "react";

interface PageLayoutProps extends SidebarProps {
  children: ReactNode;
}

export default function PageLayout({
  children,
  ...sidebarProps
}: PageLayoutProps) {
  return (
    <div className="flex h-full">
      <Sidebar {...sidebarProps} />
      <main className="flex-1">{children}</main>
    </div>
  );
}
