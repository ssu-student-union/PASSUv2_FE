import PageLayout from "@/layouts/PageLayout";
import type { SidebarButton } from "@/types/sidebar";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Download, List, Printer } from "lucide-react";
export const Route = createFileRoute("/event/$id/result")({
  component: ResultPage,
});

function ResultPage() {
  const navigate = useNavigate();
  const buttons: SidebarButton[] = [
    {
      label: "상품수령명단 인쇄",
      icon: <Printer />,
      variant: "default",
      onClick: () => {
        // 인쇄 로직
      },
    },
    {
      label: "상품수령명단 다운로드",
      icon: <Download />,
      variant: "outline",
      onClick: () => {
        // 다운로드 로직
      },
    },
    {
      label: "행사 목록",
      icon: <List />,
      variant: "outline",
      onClick: () => void navigate({ to: "/" }),
    },
  ];
  return (
    <PageLayout buttons={buttons}>
      <div>행사 결과</div>
    </PageLayout>
  );
}
