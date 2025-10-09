import {
  useEndEvent,
  useEnrolledCount,
  useEnrollStudent,
  useEventDetail,
  usePauseEvent,
  useStartEvent,
} from "@/api/event";
import { ConfirmModal } from "@/components/ConfirmModal";
import { EventInfoTooltip } from "@/components/progress/EventInfoTooltip";
import { SidebarButton } from "@/components/sidebar/SidebarButton";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarMenu,
  SidebarMenuItem,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { eventStatusMessages } from "@/constants/eventstatusMessage";
import { EventStatus, PARTICIPANT_OPTIONS } from "@/types/event";
import { Button } from "@passu/ui/button";
import { Chip } from "@passu/ui/chip";
import { Input } from "@passu/ui/input";
import { PassuLogo } from "@passu/ui/passu-logo";
import { cn } from "@passu/ui/utils";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { CircleAlert, Pause, Pencil, Play, Square } from "lucide-react";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/event/$id/progress")({
  component: ProgressPage,
});

function ProgressPage() {
  const { id } = Route.useParams();
  const navigate = useNavigate();
  const numberId = Number(id);

  const { data: eventDetail } = useEventDetail(numberId);

  const [status, setStatus] = useState<EventStatus | null>(null);
  const [inputValue, setInputValue] = useState("");
  const [authMessage, setAuthMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);
  const [showTooltip, setShowTooltip] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const { mutate: startEventAPI } = useStartEvent({
    onSuccess: () => setStatus(EventStatus.ONGOING),
  });
  const { mutate: pauseEventAPI } = usePauseEvent({
    onSuccess: () => setStatus(EventStatus.PAUSE),
  });
  const { mutate: endEventAPI } = useEndEvent({
    onSuccess: () => setStatus(EventStatus.AFTER),
  });

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
    },
    onError: () => {
      setInputValue("");
      setAuthMessage({
        type: "error",
        text: "인증 실패. 다시 시도해주세요",
      });
    },
  });

  const handleAuthentication = () => {
    if (inputValue.length === 4) {
      enrollStudent({ eventId: numberId, randomKey: inputValue });
    }
  };

  const navigateToResult = () => {
    endEventAPI(numberId);
    void navigate({ to: "/event/$id/result", params: { id } });
  };

  useEffect(() => {
    if (eventDetail?.status === EventStatus.AFTER) {
      void navigate({ to: `/event/${numberId}/result` });
    }
  }, [eventDetail?.status, navigate, numberId]);

  useEffect(() => {
    if (eventDetail?.status) {
      setStatus(eventDetail.status);
    }
  }, [eventDetail]);

  return (
    <>
      <Sidebar>
        <SidebarContent>
          <div className="mt-15 p-6">
            <PassuLogo className="w-full" />
          </div>
          <SidebarGroup>
            <SidebarMenu className="gap-4">
              {status === EventStatus.BEFORE || status === EventStatus.PAUSE ? (
                <>
                  <SidebarMenuItem>
                    <SidebarButton onClick={() => startEventAPI(numberId)}>
                      <Play />
                      <span>
                        {status === EventStatus.BEFORE
                          ? "행사 시작"
                          : "행사 재개"}
                      </span>
                    </SidebarButton>
                  </SidebarMenuItem>

                  {status === EventStatus.BEFORE && (
                    <SidebarMenuItem>
                      <SidebarButton variant="outline" asChild>
                        <Link to="/event/$id/edit" params={{ id }}>
                          <Pencil />
                          <span>행사 수정</span>
                        </Link>
                      </SidebarButton>
                    </SidebarMenuItem>
                  )}

                  <SidebarMenuItem>
                    <SidebarButton variant="outline" asChild>
                      <Link to="/">
                        <span>행사 목록으로</span>
                      </Link>
                    </SidebarButton>
                  </SidebarMenuItem>
                </>
              ) : (
                <>
                  <SidebarMenuItem>
                    <SidebarButton onClick={() => pauseEventAPI(numberId)}>
                      <Pause />
                      <span>행사 일시정지</span>
                    </SidebarButton>
                  </SidebarMenuItem>

                  <SidebarMenuItem>
                    <SidebarButton
                      variant="outline"
                      onClick={() => setOpenModal(true)}
                    >
                      <Square className="fill-hover" />
                      <span>행사 종료</span>
                    </SidebarButton>
                  </SidebarMenuItem>
                </>
              )}
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>

      <main className="flex-1">
        <header
          className={`
            flex items-center justify-between border-b bg-white p-4
            lg:hidden
          `}
        >
          <SidebarTrigger />
        </header>

        <section
          className={`
            flex h-full w-full flex-col gap-4 px-4 py-6
            sm:gap-6 sm:px-8
            md:px-12
            lg:px-20 lg:pt-20 lg:pb-10
          `}
        >
          <header
            className={`
              hidden
              lg:flex lg:justify-between
            `}
          >
            <div className="flex items-start">
              <h1
                className={`
                  text-2xl font-bold
                  sm:text-3xl
                  lg:text-4xl
                `}
              >
                {eventDetail?.name}
              </h1>
              <div className="relative">
                <CircleAlert
                  size={18}
                  color="var(--gray-400)"
                  className="cursor-pointer"
                  onMouseEnter={() => setShowTooltip(true)}
                  onMouseLeave={() => setShowTooltip(false)}
                />

                {showTooltip && eventDetail && (
                  <EventInfoTooltip
                    name={eventDetail.name}
                    location={eventDetail.location}
                    productName={eventDetail.productName}
                    target={eventDetail.requireStatus
                      .map(
                        (code) =>
                          PARTICIPANT_OPTIONS.find((opt) => opt.value === code)
                            ?.label,
                      )
                      .filter(Boolean)
                      .join(", ")}
                    feeStatus={
                      eventDetail.requireUnionFee
                        ? "납부자, 미납자"
                        : "납부자만"
                    }
                  />
                )}
              </div>
            </div>

            <Chip variant="outline">
              {enrollCount?.data.count}/{eventDetail?.productQuantity} (명)
            </Chip>
          </header>

          <section
            className={`
              flex flex-1 flex-col items-center justify-center gap-3
              overflow-y-auto rounded-2xl bg-white p-6
              sm:rounded-3xl sm:p-8
              lg:p-10
            `}
          >
            <div
              className={`
                flex w-full max-w-sm flex-col items-center gap-6
                sm:gap-8
                lg:gap-10
              `}
            >
              <p
                className={`
                  text-center text-lg leading-relaxed break-words
                  whitespace-normal
                  sm:text-xl
                  lg:text-2xl
                `}
              >
                {status && eventStatusMessages[status]}
              </p>
              <Input
                placeholder="0000"
                maxLength={4}
                value={inputValue}
                onChange={(e) =>
                  setInputValue(e.target.value.replace(/\D/g, ""))
                }
                className={`
                  h-24 max-w-80 text-center text-5xl font-bold
                  placeholder:text-5xl
                  sm:h-28 sm:text-6xl sm:placeholder:text-6xl
                  lg:text-8xl lg:placeholder:text-8xl
                `}
                disabled={
                  status === EventStatus.BEFORE || status === EventStatus.PAUSE
                }
              />
              <Button
                variant="default"
                className={`
                  h-11 w-full max-w-80 rounded-full text-base
                  sm:h-12
                `}
                disabled={
                  status === EventStatus.BEFORE || status === EventStatus.PAUSE
                }
                onClick={handleAuthentication}
              >
                인증 확인
              </Button>
            </div>
            {authMessage && (
              <p
                className={cn(
                  `
                    text-center text-sm
                    sm:txt-subtitle1
                  `,
                  authMessage.type === "success"
                    ? "text-primary"
                    : `text-red-500`,
                )}
              >
                {authMessage.text}
              </p>
            )}
          </section>
        </section>

        <ConfirmModal
          title="행사를 종료하시겠습니까?"
          subTitle="종료된 행사는 수정할 수 없습니다."
          onClose={() => setOpenModal(false)}
          onConfirm={navigateToResult}
          open={openModal}
        />
      </main>
    </>
  );
}
