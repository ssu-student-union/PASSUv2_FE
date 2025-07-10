import type { SidebarConfig } from "@/types/router";
import { Button } from "@passu/ui/button";
import { Divider } from "@passu/ui/divider";
import { PassuLogo } from "@passu/ui/passu-logo";
import { cn } from "@passu/ui/utils";

interface SidebarProps {
  config: SidebarConfig;
}

export default function SideBar({ config }: SidebarProps) {
  return (
    <aside
      className={`flex max-w-104 min-w-85 basis-1/5 flex-col gap-12 px-10 pt-24`}
    >
      <PassuLogo className="w-full" />

      <nav className="flex flex-col gap-3">
        {config.buttons.map((button, index) => {
          const outlineClasses =
            button.variant === "outline"
              ? "border-2 text-primary hover:text-primary"
              : "";
          return (
            <Button
              key={index}
              onClick={button.onClick}
              className={cn(
                "flex h-12 w-full gap-2 rounded-full px-6 py-4",
                button.variant === "outline" && outlineClasses,
              )}
              variant={button.variant}
            >
              {button.icon}
              <span>{button.label}</span>
            </Button>
          );
        })}
      </nav>

      {config.list && (
        <section className={"flex w-full flex-col gap-1.5"}>
          <div className="txt-h5 text-gray-600">상품수령명단</div>
          <Divider className="text-gray-400" />
          <ul className="gap-1.5 txt-subtitle1 text-gray-600">
            {config.list.map((item, i) => (
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
