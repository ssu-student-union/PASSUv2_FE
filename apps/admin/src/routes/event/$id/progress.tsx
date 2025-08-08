import { FinishModal } from "@/components/progress/FinishModal";
import { Sidebar } from "@/components/sidebar/Sidebar";
import { SidebarButton } from "@/components/sidebar/SidebarButton";
import { SidebarButtonGroup } from "@/components/sidebar/SidebarButtonGroup";
import { SidebarDownloadListButton } from "@/components/sidebar/SidebarDownloadListButton";
import { SidebarGoToEventList } from "@/components/sidebar/SidebarGoToEventList";
import { SidebarListSection } from "@/components/sidebar/SidebarListSection";
import { eventStatusMessages } from "@/constants/eventstatusMessage";
import { useTimer } from "@/hooks/useTimer";
import { EventStatus } from "@/types/event";
import { formatTime } from "@/utils/formatTime";
import { Button } from "@passu/ui/button";
import { Chip } from "@passu/ui/chip";
import { Input } from "@passu/ui/input";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Pause, Pencil, Play, Square } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/event/$id/progress")({
  component: ProgressPage,
});

function ProgressPage() {
  const { id } = Route.useParams();
  const navigate = useNavigate();

  const [status, setStatus] = useState<EventStatus>(EventStatus.NotStarted);
  const [participantCount, setParticipantCount] = useState(0);
  const [inputValue, setInputValue] = useState("");

  const startEvent = () => setStatus(EventStatus.Ongoing);
  const pauseEvent = () => setStatus(EventStatus.Paused);
  const finishEvent = () => setStatus(EventStatus.Finished);
  const resumeEvent = () => setStatus(EventStatus.Ongoing);

  const handleInputChange = (value: string) => {
    if (/^\d*$/.test(value)) {
      setInputValue(value);
    }
  };

  const handleAuthentication = () => {
    if (inputValue.length === 4) {
      // 인증 api
      setParticipantCount((prev) => prev + 1);
      setInputValue("");
    }
  };

  const elapsedTime = useTimer(status === EventStatus.Ongoing);

  const totalParticipants = 600;

  const onConfirm = () => {
    // 행사 종료 api

    void navigate({
      to: "/event/$id/result",
      params: { id },
    });
  };

  return (
    <>
      <Sidebar>
        <SidebarButtonGroup>
          {status === EventStatus.NotStarted ||
          status === EventStatus.Paused ? (
            <>
              <SidebarButton
                onClick={
                  status === EventStatus.NotStarted ? startEvent : resumeEvent
                }
              >
                <Play />
                <span>
                  {status === EventStatus.NotStarted
                    ? "행사 시작"
                    : "행사 재개"}
                </span>
              </SidebarButton>

              <SidebarButton variant="outline" asChild>
                <Link to="/event/$id/edit" params={{ id }}>
                  <Pencil />
                  <span>행사 수정</span>
                </Link>
              </SidebarButton>

              <SidebarGoToEventList />
            </>
          ) : (
            <>
              <SidebarButton onClick={pauseEvent}>
                <Pause />
                <span>행사 일시정지</span>
              </SidebarButton>

              <SidebarButton variant="outline" onClick={finishEvent}>
                <Square className="fill-hover" />
                <span>행사 종료</span>
              </SidebarButton>
            </>
          )}
          <SidebarDownloadListButton />
        </SidebarButtonGroup>

        <SidebarListSection />
      </Sidebar>

      <div className="flex-1">
        <div className={`flex h-full w-full flex-col gap-6 px-20 pt-20 pb-10`}>
          <div className="flex justify-between">
            <span className="text-4xl font-bold">2025-1학기 야식행사</span>

            <div className="flex h-10 gap-7">
              <Chip variant="outline">
                {participantCount}/{totalParticipants} (명)
              </Chip>
              <Chip variant="outline">{formatTime(elapsedTime)}</Chip>
            </div>
          </div>

          <div
            className={`
              flex flex-1 items-center justify-center gap-12 overflow-y-auto
              rounded-3xl bg-white p-10
            `}
          >
            <div className="flex flex-col gap-10">
              <span
                className={`
                  mx-auto max-w-[22rem] text-center text-2xl break-words
                  whitespace-normal
                `}
              >
                {eventStatusMessages[status]}
              </span>

              <Input
                placeholder="0000"
                maxLength={4}
                value={inputValue}
                onChange={(e) => handleInputChange(e.target.value)}
                className={`
                  h-34 w-78 text-center text-8xl font-bold
                  placeholder:text-8xl
                `}
                disabled={
                  status === EventStatus.NotStarted ||
                  status === EventStatus.Paused
                }
              />
              <Button
                variant="default"
                className={`h-12 rounded-full`}
                disabled={
                  status === EventStatus.NotStarted ||
                  status === EventStatus.Paused
                }
                onClick={handleAuthentication}
              >
                인증 확인
              </Button>
            </div>
          </div>
        </div>

        {status === EventStatus.Finished && (
          <div
            className={`
              fixed inset-0 flex items-center justify-center bg-black/40
            `}
          >
            <FinishModal onClose={resumeEvent} onConfirm={onConfirm} />
          </div>
        )}
      </div>
    </>
  );
}
