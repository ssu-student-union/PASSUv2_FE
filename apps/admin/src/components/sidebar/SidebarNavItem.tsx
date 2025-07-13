import { Link } from "@tanstack/react-router";
import SidebarButton from "./SidebarButton";
import type { SidebarButtonItem } from "@/types/sidebar";

interface Props {
  item: SidebarButtonItem;
}

export default function SidebarNavItem({ item }: Props) {
  return item.type === "link" ? (
    <SidebarButton variant={item.variant} asChild>
      <Link to={item.to}>
        {item.icon}
        <span>{item.label}</span>
      </Link>
    </SidebarButton>
  ) : (
    <SidebarButton onClick={item.onClick} variant={item.variant}>
      {item.icon}
      <span>{item.label}</span>
    </SidebarButton>
  );
}
