import Sidebar from "@/components/sidebar/Sidebar";
import SidebarListSection from "@/components/sidebar/SidebarListSection";
import SidebarNavItem from "@/components/sidebar/SidebarNavItem";
import type { SidebarProps } from "@/types/sidebar";
import type { ReactNode } from "react";

interface PageLayoutProps extends SidebarProps {
  children: ReactNode;
}

export default function PageLayout({
  children,
  list,
  buttons,
}: PageLayoutProps) {
  return (
    <div className="flex h-full">
      <Sidebar>
        <nav className="flex flex-col gap-3">
          {buttons.map((item, idx) => (
            <SidebarNavItem key={idx} item={item} />
          ))}
        </nav>
        {list && <SidebarListSection list={list} />}
      </Sidebar>
      <main className="flex-1">{children}</main>
    </div>
  );
}
