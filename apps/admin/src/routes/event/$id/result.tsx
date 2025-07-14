import Sidebar from "@/components/sidebar/Sidebar";
import SidebarButton from "@/components/sidebar/SidebarButton";
import { SidebarButtonGroup } from "@/components/sidebar/SidebarButtonGroup";
import SidebarDownloadListButton from "@/components/sidebar/SidebarDownloadListButton";
import { SidebarGoToEventList } from "@/components/sidebar/SidebarGoToEventList";
import SidebarListSection from "@/components/sidebar/SidebarListSection";
import PageLayout from "@/layouts/PageLayout";
import { createFileRoute } from "@tanstack/react-router";
import { Printer } from "lucide-react";
export const Route = createFileRoute("/event/$id/result")({
  component: ResultPage,
});

function ResultPage() {
  return (
    <PageLayout>
      <Sidebar>
        <SidebarButtonGroup>
          <SidebarButton>
            <Printer />
            상품수령명단 인쇄
          </SidebarButton>

          <SidebarDownloadListButton />

          <SidebarGoToEventList />
        </SidebarButtonGroup>

        <SidebarListSection />
      </Sidebar>

      <div className="flex-1">행사 결과</div>
    </PageLayout>
  );
}
