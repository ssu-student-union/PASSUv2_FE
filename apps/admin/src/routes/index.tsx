import { createFileRoute, Link } from "@tanstack/react-router";
import { LogOut, Plus } from "lucide-react";
import PageLayout from "@/layouts/PageLayout";
import Sidebar from "@/components/sidebar/Sidebar";
import { SidebarButtonGroup } from "@/components/sidebar/SidebarButtonGroup";
import SidebarButton from "@/components/sidebar/SidebarButton";

export const Route = createFileRoute("/")({
  component: App,
});

function App() {
  return (
    <PageLayout>
      <Sidebar>
        <SidebarButtonGroup>
          <SidebarButton asChild>
            <Link to="/event/create">
              <Plus />
              행사 생성
            </Link>
          </SidebarButton>

          <SidebarButton variant="outline">
            <LogOut />
            로그아웃
          </SidebarButton>
        </SidebarButtonGroup>
      </Sidebar>

      <div className="flex-1">메인</div>
    </PageLayout>
  );
}
