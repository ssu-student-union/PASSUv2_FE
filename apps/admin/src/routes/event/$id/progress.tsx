import PageLayout from "@/layouts/PageLayout";
import type { SidebarButton, SidebarListItem } from "@/types/sidebar";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Download, List, Pause, Pencil, Play, Square } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/event/$id/progress")({
  component: ProgressPage,
});

type EventStatus = "not_started" | "ongoing" | "paused" | "finished";

function ProgressPage() {
  const navigate = useNavigate();
  const [status, setStatus] = useState<EventStatus>("not_started");

  let buttons: SidebarButton[];

  if (status === "not_started" || status === "paused") {
    // 시작 전 or 일시정지
    const firstButton: SidebarButton =
      status === "paused"
        ? {
            label: "행사 시작",
            icon: <Play />,
            variant: "default",
            onClick: () => {
              setStatus("ongoing");
            },
          }
        : {
            label: "행사 재개",
            icon: <Play />,
            variant: "default",
            onClick: () => setStatus("ongoing"),
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
    // 진행 중
    buttons = [
      {
        label: "행사 일시정지",
        icon: <Pause />,
        variant: "default",
        onClick: () => setStatus("paused"),
      },
      {
        label: "행사 종료",
        icon: <Square fill="var(--hover)" />,
        variant: "outline",
        onClick: () => setStatus("finished"),
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
  const list: SidebarListItem[] = [
    { date: "2025.05.26 18:05:33", name: "하이하", code: 2321 },
    { date: "2025.05.26 18:05:33", name: "하이하", code: 2321 },
    { date: "2025.05.26 18:05:33", name: "하이하", code: 2321 },
  ];

  return (
    <PageLayout buttons={buttons} list={list}>
      <div>progress</div>
    </PageLayout>
  );
}
