import { Sidebar } from "@/components/sidebar/Sidebar";
import { SidebarButton } from "@/components/sidebar/SidebarButton";
import { SidebarButtonGroup } from "@/components/sidebar/SidebarButtonGroup";
import { SidebarDownloadListButton } from "@/components/sidebar/SidebarDownloadListButton";
import { SidebarGoToEventList } from "@/components/sidebar/SidebarGoToEventList";
import { SidebarListSection } from "@/components/sidebar/SidebarListSection";
import type { SidebarListItem } from "@/types/sidebar";
import { Button } from "@passu/ui/button";
import { Chip } from "@passu/ui/chip";
import { Input } from "@passu/ui/input";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Pause, Pencil, Play, Square } from "lucide-react";
import { useEffect, useState, type JSX } from "react";

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
  const { id } = Route.useParams();
  const [status, setStatus] = useState<EventStatus>(EventStatus.NotStarted);

  const [elapsedTime, setElapsedTime] = useState(0); // 경과 시간 (초 단위)
  const [participantCount, setParticipantCount] = useState(0); // 현재 참여 인원
  const [inputValue, setInputValue] = useState(""); // 인증번호 입력값

  const totalParticipants = 600; // 전체 참여 인원

  const statusMessages: Record<EventStatus, JSX.Element> = {
    [EventStatus.NotStarted]: (
      <>
        행사 시작 버튼을 누르면 <br />
        인증번호 입력창이 활성화됩니다.
      </>
    ),
    [EventStatus.Ongoing]: <>인증번호를 입력해주세요.</>,
    [EventStatus.Paused]: (
      <>
        행사 재개 버튼을 누르면 <br />
        인증번호 입력창이 활성화됩니다.
      </>
    ),
    [EventStatus.Finished]: <>행사가 종료되었습니다.</>,
  };

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;

    if (status === EventStatus.Ongoing) {
      interval = setInterval(() => {
        setElapsedTime((prevTime) => prevTime + 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [status]);

  // 시간 포맷팅 함수
  const formatTime = (timeInSeconds: number) => {
    const hours = String(Math.floor(timeInSeconds / 3600)).padStart(2, "0");
    const minutes = String(Math.floor((timeInSeconds % 3600) / 60)).padStart(
      2,
      "0",
    );
    const seconds = String(timeInSeconds % 60).padStart(2, "0");
    return `${hours}:${minutes}:${seconds}`;
  };

  // 인증 처리 함수
  const handleAuthentication = () => {
    // api 호출
    if (inputValue.length === 4) {
      setParticipantCount((prevCount) => prevCount + 1);
      setInputValue(""); // 성공 후 입력창 비우기
      console.log(`인증 성공: ${inputValue}`);
    }
  };

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

      <div className="flex-1">
        <div className={`flex h-full w-full flex-col gap-6 px-20 pt-20 pb-10`}>
          <div className="flex justify-between">
            <span className="text-4xl font-bold">2025-1학기 야식행사</span>

            <div className="flex gap-7">
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
                {statusMessages[status]}
              </span>

              <Input
                placeholder="0000"
                maxLength={4}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
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
                variant="outline"
                className={`
                  h-12 rounded-full bg-white text-primary
                  hover:text-primary
                `}
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
      </div>
    </>
  );
}
