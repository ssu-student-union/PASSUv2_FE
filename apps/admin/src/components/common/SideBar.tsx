import type { SidebarProps } from "@/types/sidebar";
import { Button } from "@passu/ui/button";
import { Divider } from "@passu/ui/divider";
import { PassuLogo } from "@passu/ui/passu-logo";

export default function Sidebar({ buttons, list }: SidebarProps) {
  return (
    <aside
      className={`flex max-w-104 min-w-85 basis-1/5 flex-col gap-12 px-10 pt-24`}
    >
      <PassuLogo className="w-full" />

      <nav className="flex flex-col gap-3">
        {buttons.map((button, index) => {
          const outlineClass =
            button.variant === "outline"
              ? "border-2 text-primary hover:text-primary"
              : "";

          return (
            <Button
              key={index}
              className={outlineClass}
              size="sidebar"
              variant={button.variant}
            >
              {button.icon}
              <span>{button.label}</span>
            </Button>
          );
        })}
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
