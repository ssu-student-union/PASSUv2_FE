import type { SidebarButtonItem, SidebarListItem } from "@/types/sidebar";
import { PassuLogo } from "@passu/ui/passu-logo";
import SidebarNavItem from "./SidebarNavItem";
import SidebarListSection from "./SidebarListSection";

interface SidebarProps {
  buttons: SidebarButtonItem[];
  list?: SidebarListItem[];
}

export default function Sidebar({ buttons, list }: SidebarProps) {
  return (
    <aside
      className={`flex max-w-104 min-w-85 basis-1/5 flex-col gap-12 px-10 pt-24`}
    >
      <PassuLogo className="w-full" />

      <nav className="flex flex-col gap-3">
        {buttons.map((item, idx) => (
          <SidebarNavItem key={idx} item={item} />
        ))}
      </nav>
      {list && <SidebarListSection list={list} />}
    </aside>
  );
}
