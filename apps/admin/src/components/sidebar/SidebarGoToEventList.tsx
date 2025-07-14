import { Link } from "@tanstack/react-router";
import SidebarButton from "./SidebarButton";
import { List } from "lucide-react";

export const SidebarGoToEventList = () => {
  return (
    <SidebarButton asChild variant="outline">
      <Link to="/">
        <List />
        행사 목록
      </Link>
    </SidebarButton>
  );
};
