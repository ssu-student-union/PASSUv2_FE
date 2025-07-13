import PageLayout from "@/layouts/PageLayout";
import type { SidebarButtonItem, SidebarListItem } from "@/types/sidebar";
import { createFileRoute } from "@tanstack/react-router";
import { Download, List, Pause, Pencil, Play, Square } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/event/$id/progress")({
  component: ProgressPage,
});

type EventStatus = "not_started" | "ongoing" | "paused" | "finished";

function ProgressPage() {
  const [status, setStatus] = useState<EventStatus>("not_started");

  let buttons: SidebarButtonItem[];

  if (status === "not_started" || status === "paused") {
    // 시작 전 or 일시정지
    const firstButton: SidebarButtonItem =
      status === "paused"
        ? {
            type: "action",
            label: "행사 시작",
            icon: <Play />,
            variant: "default",
            onClick: () => {
              setStatus("ongoing");
            },
          }
        : {
            type: "action",
            label: "행사 재개",
            icon: <Play />,
            variant: "default",
            onClick: () => setStatus("ongoing"),
          };

    buttons = [
      firstButton,
      {
        type: "action",
        label: "행사 수정",
        icon: <Pencil />,
        variant: "outline",
        onClick: () => {
          // 행사 수정 로직
        },
      },
      {
        type: "link",
        label: "행사 목록",
        icon: <List />,
        variant: "outline",
        to: "/",
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
    ];
  } else {
    // 진행 중
    buttons = [
      {
        type: "action",
        label: "행사 일시정지",
        icon: <Pause />,
        variant: "default",
        onClick: () => setStatus("paused"),
      },
      {
        type: "action",
        label: "행사 종료",
        icon: <Square fill="var(--hover)" />,
        variant: "outline",
        onClick: () => setStatus("finished"),
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
