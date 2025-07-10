import SideBar from "@/components/common/SideBar";
import type { SidebarConfig } from "@/types/router";
import type { ReactNode } from "react";

interface PageLayoutProps {
  children: ReactNode;
  config: SidebarConfig;
}

export default function PageLayout({ children, config }: PageLayoutProps) {
  return (
    <div className="flex h-full">
      <SideBar config={config} />
      <main className="flex-1">{children}</main>
    </div>
  );
}
