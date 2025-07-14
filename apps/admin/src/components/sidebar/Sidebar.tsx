import { PassuLogo } from "@passu/ui/passu-logo";

import { type ReactNode } from "react";

interface SidebarProps {
  children: ReactNode;
}

export default function Sidebar({ children }: SidebarProps) {
  return (
    <aside
      className={`
        flex h-full max-w-104 min-w-85 basis-1/5 flex-col gap-12 px-10 pt-24
      `}
    >
      <PassuLogo className="w-full" />
      {children}
    </aside>
  );
}
