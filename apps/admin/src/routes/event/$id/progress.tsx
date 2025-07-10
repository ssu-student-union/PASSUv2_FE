import PageLayout from "@/layouts/PageLayout";
import type { SidebarButton, SidebarConfig } from "@/types/router";
import { createFileRoute } from "@tanstack/react-router";
import { Download, List, Pause, Pencil, Play, Square } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/event/$id/progress")({
  component: ProgressPage,
});

function ProgressPage() {
  const [isOngoing, setIsOngoing] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  let buttons: SidebarButton[];

  if (!isOngoing) {
    // 시작 전
    buttons = [
      {
        label: "행사 시작",
        icon: <Play />,
        variant: "default",
        onClick: () => {
          setIsOngoing(true);
          setIsPaused(false);
        },
      },
      {
        label: "행사 수정",
        icon: <Pencil />,
        variant: "outline",
      },
      {
        label: "행사 목록",
        icon: <List />,
        variant: "outline",
      },
      {
        label: "상품수령명단 다운로드",
        icon: <Download />,
        variant: "outline",
      },
    ];
  } else {
    // 진행 중
    const actionButton: SidebarButton = isPaused
      ? {
          label: "행사 재개",
          icon: <Play />,
          variant: "default",
          onClick: () => setIsPaused(false),
        }
      : {
          label: "행사 일시정지",
          icon: <Pause />,
          fill: "var(--hover)",
          variant: "default",
          onClick: () => setIsPaused(true),
        };

    buttons = [
      actionButton,
      {
        label: "행사 종료",
        icon: <Square fill="var(--hover)" />,
        variant: "outline",
        onClick: () => setIsOngoing(false),
      },
      {
        label: "상품수령명단 다운로드",
        icon: <Download />,
        variant: "outline",
      },
    ];
  }

  const config: SidebarConfig = {
    title: "행사 진행",
    buttons,
    list: [
      { date: "2025.05.26 18:05:33", name: "장우영", code: 2321 },
      { date: "2025.05.26 18:05:33", name: "장우영", code: 2321 },
      { date: "2025.05.26 18:05:33", name: "장우영", code: 2321 },
      { date: "2025.05.26 18:05:33", name: "장우영", code: 2321 },
    ],
  };

  return (
    <PageLayout config={config}>
      <div>progress</div>
    </PageLayout>
  );
}
