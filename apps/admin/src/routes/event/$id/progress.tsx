import { Sidebar } from "@/components/sidebar/Sidebar";
import { SidebarButton } from "@/components/sidebar/SidebarButton";
import { SidebarButtonGroup } from "@/components/sidebar/SidebarButtonGroup";
import { SidebarDownloadListButton } from "@/components/sidebar/SidebarDownloadListButton";
import { SidebarGoToEventList } from "@/components/sidebar/SidebarGoToEventList";
import { SidebarListSection } from "@/components/sidebar/SidebarListSection";
import type { SidebarListItem } from "@/types/sidebar";
import { createFileRoute } from "@tanstack/react-router";
import { Pause, Pencil, Play, Square } from "lucide-react";
import { useState } from "react";

// mock data
const list: SidebarListItem[] = [
  { date: "2025.05.26 18:05:33", name: "하이하", code: 2321 },
  { date: "2025.05.26 18:05:33", name: "하이하", code: 2321 },
  { date: "2025.05.26 18:05:33", name: "하이하", code: 2321 },
];

export const Route = createFileRoute("/event/$id/progress")({
  component: ProgressPage,
});

const enum EventStatus {
  NotStarted = "not_started",
  Ongoing = "ongoing",
  Paused = "paused",
  Finished = "finished",
}

function ProgressPage() {
  const [status, setStatus] = useState<EventStatus>(EventStatus.NotStarted);

  return (
    <>
      <Sidebar>
        <SidebarButtonGroup>
          {status === EventStatus.NotStarted ||
          status === EventStatus.Paused ? (
            <>
              <SidebarButton onClick={() => setStatus(EventStatus.Ongoing)}>
                <Play />
                <span>
                  {status === EventStatus.NotStarted
                    ? "행사 시작"
                    : "행사 재개"}
                </span>
              </SidebarButton>

              <SidebarButton
                variant="outline"
                onClick={() => {
                  /* 수정 로직 */
                }}
              >
                <Pencil />
                <span>행사 수정</span>
              </SidebarButton>

              <SidebarGoToEventList />
            </>
          ) : (
            <>
              <SidebarButton onClick={() => setStatus(EventStatus.Paused)}>
                <Pause />
                <span>행사 일시정지</span>
              </SidebarButton>

              <SidebarButton
                variant="outline"
                onClick={() => setStatus(EventStatus.Finished)}
              >
                <Square className="fill-hover" />
                <span>행사 종료</span>
              </SidebarButton>
            </>
          )}
          <SidebarDownloadListButton />
        </SidebarButtonGroup>

        <SidebarListSection list={list} />
      </Sidebar>

      <div className="flex-1">이벤트 진행 페이지</div>
    </>
  );
}
