import PageLayout from "@/layouts/PageLayout";
import type { SidebarButton, SidebarConfig } from "@/types/router";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Download, List, Pause, Pencil, Play, Square } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/event/$id/progress")({
  component: ProgressPage,
});

function ProgressPage() {
  const navigate = useNavigate();
  const [isOngoing, setIsOngoing] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  let buttons: SidebarButton[];

  if (!isOngoing || isPaused) {
    // ✅ 시작 전 or 일시정지
    const firstButton: SidebarButton = !isOngoing
      ? {
          label: "행사 시작",
          icon: <Play />,
          variant: "default",
          onClick: () => {
            setIsOngoing(true);
            setIsPaused(false);
          },
        }
      : {
          label: "행사 재개",
          icon: <Play />,
          variant: "default",
          onClick: () => setIsPaused(false),
        };

    buttons = [
      firstButton,
      {
        label: "행사 수정",
        icon: <Pencil />,
        variant: "outline",
        onClick: () => {
          // 행사 수정 로직
        },
      },
      {
        label: "행사 목록",
        icon: <List />,
        variant: "outline",
        onClick: () => void navigate({ to: "/" }),
      },
      {
        label: "상품수령명단 다운로드",
        icon: <Download />,
        variant: "outline",
        onClick: () => {
          // 다운로드 로직
        },
      },
    ];
  } else {
    // ✅ 진행 중
    buttons = [
      {
        label: "행사 일시정지",
        icon: <Pause />,
        variant: "default",
        onClick: () => setIsPaused(true),
      },
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
        onClick: () => {
          // 다운로드 로직
        },
      },
    ];
  }
  const config: SidebarConfig = {
    title: "행사 진행",
    buttons,
    list: [
      { date: "2025.05.26 18:05:33", name: "하이하", code: 2321 },
      { date: "2025.05.26 18:05:33", name: "하이하", code: 2321 },
      { date: "2025.05.26 18:05:33", name: "하이하", code: 2321 },
    ],
  };

  return (
    <PageLayout config={config}>
      <div>progress</div>
    </PageLayout>
  );
}
