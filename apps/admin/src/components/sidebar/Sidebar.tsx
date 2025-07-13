import type { SidebarButtonItem, SidebarListItem } from "@/types/sidebar";
import { Divider } from "@passu/ui/divider";
import { PassuLogo } from "@passu/ui/passu-logo";
import SidebarButton from "./SidebarButton";
import { Link } from "@tanstack/react-router";

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
        {buttons.map((item, index) =>
          item.type === "link" ? (
            <SidebarButton key={index} variant={item.variant} asChild>
              <Link to={item.to}>
                {item.icon}
                <span>{item.label}</span>
              </Link>
            </SidebarButton>
          ) : (
            <SidebarButton
              key={index}
              onClick={item.onClick}
              variant={item.variant}
            >
              {item.icon}
              <span>{item.label}</span>
            </SidebarButton>
          ),
        )}
      </nav>

      {list && (
        <section className={"flex w-full flex-col gap-1.5"}>
          <div className="txt-h5 text-gray-600">상품수령명단</div>
          <Divider className="text-gray-400" />
          <ul className="gap-1.5 txt-subtitle1 text-gray-600">
            {list.map((item, i) => (
              <li key={i}>
                {item.date} {item.name} {item.code}
              </li>
            ))}
          </ul>
        </section>
      )}
    </aside>
  );
}
