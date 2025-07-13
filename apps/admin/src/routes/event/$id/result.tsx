import PageLayout from "@/layouts/PageLayout";
import type { SidebarButtonItem } from "@/types/sidebar";
import { createFileRoute } from "@tanstack/react-router";
import { Download, List, Printer } from "lucide-react";
export const Route = createFileRoute("/event/$id/result")({
  component: ResultPage,
});

function ResultPage() {
  const buttons: SidebarButtonItem[] = [
    {
      type: "action",
      label: "상품수령명단 인쇄",
      icon: <Printer />,
      variant: "default",
      onClick: () => {
        // 인쇄 로직
      },
    },
    {
      type: "action",
      label: "상품수령명단 다운로드",
      icon: <Download />,
      variant: "outline",
      onClick: () => {
        // 다운로드 로직
      },
    },
    {
      type: "link",
      label: "행사 목록",
      icon: <List />,
      variant: "outline",
      to: "/",
    },
  ];
  return (
    <PageLayout buttons={buttons}>
      <div>행사 결과</div>
    </PageLayout>
  );
}
