import {
  useEndEvent,
  useEnrolledCount,
  useEnrollmentList,
  useEnrollStudent,
  useEventDetail,
  usePauseEvent,
  useStartEvent,
} from "@/api/event";
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
import { cn } from "@passu/ui/utils";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Pause, Pencil, Play, Square } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/event/$id/progress")({
  component: ProgressPage,
});

function ProgressPage() {
  const { id } = Route.useParams();
  const navigate = useNavigate();
  const numberId = Number(id);

  const [status, setStatus] = useState<EventStatus>(EventStatus.BEFORE);
  const [inputValue, setInputValue] = useState("");
  const [authMessage, setAuthMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const { mutate: startEventAPI } = useStartEvent({
    onSuccess: () => setStatus(EventStatus.ONGOING),
  });
  const { mutate: pauseEventAPI } = usePauseEvent({
    onSuccess: () => setStatus(EventStatus.PAUSE),
  });
  const { mutate: endEventAPI } = useEndEvent({
    onSuccess: () => setStatus(EventStatus.AFTER),
  });

  const { data: eventDetail } = useEventDetail(numberId);
  const { data: enrollList, refetch: refetchEnrollList } =
    useEnrollmentList(numberId);
  const { data: enrollCount, refetch: refetchEnrollCount } =
    useEnrolledCount(numberId);

  const { mutate: enrollStudent } = useEnrollStudent({
    onSuccess: async (res) => {
      setInputValue("");
      setAuthMessage({
        type: "success",
        text: `${res.data.studentName} 인증 성공!`,
      });
      await refetchEnrollCount();
      await refetchEnrollList();
    },
    onError: (err: Error) => {
      setAuthMessage({
        type: "error",
        text: err.message || "인증 실패. 다시 시도해주세요",
      });
    },
  });

  const handleAuthentication = () => {
    if (inputValue.length === 4) {
      enrollStudent({ eventId: numberId, randomKey: inputValue });
    }
  };

  const elapsedTime = useTimer(
    null,
    status === EventStatus.ONGOING || status === EventStatus.PAUSE,
  );

  const navigateToResult = () => {
    endEventAPI(numberId);
    void navigate({ to: "/event/$id/result", params: { id } });
  };

  return (
    <>
      <Sidebar>
        <SidebarButtonGroup>
          {status === EventStatus.BEFORE || status === EventStatus.PAUSE ? (
            <>
              <SidebarButton onClick={() => startEventAPI(numberId)}>
                <Play />
                <span>
                  {status === EventStatus.BEFORE ? "행사 시작" : "행사 재개"}
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
              <SidebarButton onClick={() => pauseEventAPI(numberId)}>
                <Pause />
                <span>행사 일시정지</span>
              </SidebarButton>
              <SidebarButton
                variant="outline"
                onClick={() => endEventAPI(numberId)}
              >
                <Square className="fill-hover" />
                <span>행사 종료</span>
              </SidebarButton>
            </>
          )}
          <SidebarDownloadListButton />
        </SidebarButtonGroup>
        <SidebarListSection list={enrollList?.data.slice(0, 5)} />
      </Sidebar>

      <main className="flex-1">
        <section className="flex h-full w-full flex-col gap-6 px-20 pt-20 pb-10">
          <header className="flex justify-between">
            <h1 className="text-4xl font-bold">{eventDetail?.name}</h1>
            <div className="flex h-10 gap-7">
              <Chip variant="outline">
                {enrollCount?.data.count}/{eventDetail?.productQuantity} (명)
              </Chip>
              <Chip variant="outline">{formatTime(elapsedTime)}</Chip>
            </div>
          </header>

          <section
            className={`
              flex flex-1 items-center justify-center gap-12 overflow-y-auto
              rounded-3xl bg-white p-10
            `}
          >
            <div className="flex flex-col gap-10">
              <p
                className={`
                  mx-auto max-w-[22rem] text-center text-2xl break-words
                  whitespace-normal
                `}
              >
                {eventStatusMessages[status]}
              </p>
              <Input
                placeholder="0000"
                maxLength={4}
                value={inputValue}
                onChange={(e) =>
                  setInputValue(e.target.value.replace(/\D/g, ""))
                }
                className={`
                  h-34 w-78 text-center text-8xl font-bold
                  placeholder:text-8xl
                `}
                disabled={
                  status === EventStatus.BEFORE || status === EventStatus.PAUSE
                }
              />
              <div className="flex flex-col gap-3">
                <Button
                  variant="default"
                  className="h-12 rounded-full"
                  disabled={
                    status === EventStatus.BEFORE ||
                    status === EventStatus.PAUSE
                  }
                  onClick={handleAuthentication}
                >
                  인증 확인
                </Button>
                {authMessage && (
                  <p
                    className={cn(
                      "text-center txt-subtitle1",
                      authMessage.type === "success"
                        ? "text-primary"
                        : `text-red-500`,
                    )}
                  >
                    {authMessage.text}
                  </p>
                )}
              </div>
            </div>
          </section>
        </section>

        {status === EventStatus.AFTER && (
          <div
            className={`
              fixed inset-0 flex items-center justify-center bg-black/40
            `}
          >
            <FinishModal
              open
              onClose={() => startEventAPI(numberId)}
              onConfirm={navigateToResult}
            />
          </div>
        )}
      </main>
    </>
  );
}
