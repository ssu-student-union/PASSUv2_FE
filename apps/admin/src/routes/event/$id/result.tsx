import PageLayout from "@/layouts/PageLayout";
import type { SidebarConfig } from "@/types/router";
import { createFileRoute } from "@tanstack/react-router";
import { Download, List, Printer } from "lucide-react";
export const Route = createFileRoute("/event/$id/result")({
  component: ResultPage,
});

function ResultPage() {
  const config: SidebarConfig = {
    title: "행사 결과",
    buttons: [
      {
        label: "상품수령명단 인쇄",
        icon: Printer,
        variant: "default",
      },
      {
        label: "상품수령명단 다운로드",
        icon: Download,
        variant: "outline",
      },
      {
        label: "행사 목록",
        icon: List,
        variant: "outline",
      },
    ],
  };
  return (
    <PageLayout config={config}>
      <div>행사 결과</div>
    </PageLayout>
  );
}
