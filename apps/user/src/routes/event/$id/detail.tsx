import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@passu/ui/button";
import { Header } from "@/components/Header";
import { Chip } from "@passu/ui/chip";
import { Divider } from "@passu/ui/divider";
import { useNavigate } from "@tanstack/react-router";
import { useEventDetail, useEnrolledCount } from "@/api/event";
import { useUserInfo } from "@/api/user";
import { EventRequireStatus } from "@/model/api";
import { getRequireStatuses } from "@/utils/requireStatus";
import { useMemo } from "react";

export const Route = createFileRoute("/event/$id/detail")({
  component: EventDetailPage,
});

function EventDetailPage() {
  const { id } = Route.useParams();
  const navigate = useNavigate();

  // 이벤트 상세 정보 조회
  const { data: eventData, isLoading: isEventLoading } = useEventDetail(id);

  // 등록 학생 수 조회
  const { data: enrolledCountData, isLoading: isCountLoading } =
    useEnrolledCount(id);

  // 사용자 정보 조회
  const { data: userInfoData, isLoading: isUserLoading } = useUserInfo();

  const handleParticipateClick = () => {
    void navigate({ to: "/event/$id/enroll", params: { id } });
  };

  // 참여 가능 여부 확인
  const canParticipate = useMemo(() => {
    if (!eventData?.result || !userInfoData?.result) return false;

    const event = eventData.data;
    const user = userInfoData.data;

    // 진행 중인 행사가 아닌 경우
    if (event.status !== "ONGOING") return false;

    // 학적 상태 확인 (사용자의 status가 이벤트의 require_status 비트마스크에 포함되는지)
    const userStatusNum = Number(user.status);
    if (userStatusNum && !(event.require_status & userStatusNum)) return false;

    // 학과 확인 (모든 학과 허용이 아닌 경우)
    if (
      !event.allow_all_departments &&
      !event.allowed_departments.includes(user.major)
    ) {
      return false;
    }

    return true;
  }, [eventData, userInfoData]);

  // 로딩 상태
  if (isEventLoading) {
    return (
      <div className="flex size-full flex-col">
        <Header />
        <div
          className="flex grow items-center justify-center"
          aria-live="polite"
          aria-busy={true}
        >
          <p className="txt-h2 text-gray-800">이벤트 정보를 불러오는 중...</p>
        </div>
      </div>
    );
  }

  // 이벤트 데이터가 없는 경우
  if (!eventData?.result) {
    return (
      <div className="flex size-full flex-col">
        <Header />
        <div
          className={`
            flex grow flex-col items-center justify-center text-center
          `}
        >
          <p className="txt-h2 text-gray-800">이벤트를 찾을 수 없습니다.</p>
        </div>
        <Button size="footer" asChild>
          <Link to="/">홈으로 돌아가기</Link>
        </Button>
      </div>
    );
  }

  const event = eventData.data;
  const enrolledCount = enrolledCountData?.result ? enrolledCountData.data : 0;
  const requiredStatuses = getRequireStatuses(event.require_status);

  return (
    <div className="flex size-full flex-col">
      <Header />
      <div className="flex grow flex-col gap-4 px-6">
        <div className="flex flex-col gap-5">
          <h2 className="txt-h2 text-gray-800">{event.name}</h2>
          <div className="flex flex-wrap gap-2">
            <Chip variant={event.status === "ONGOING" ? "primary" : "default"}>
              {event.status === "BEFORE" && "시작 전"}
              {event.status === "ONGOING" && "진행 중"}
              {event.status === "PAUSE" && "일시 중지"}
              {event.status === "AFTER" && "종료"}
            </Chip>
            <Chip>
              <span>잔여수량</span>
              <span className="ml-1">
                <span className="font-bold">
                  {isCountLoading ? "..." : enrolledCount}
                </span>
                /{event.product_quantity} 명
              </span>
            </Chip>
            {event.allowed_departments.map((major: string) => (
              <Chip key={major}>{major}</Chip>
            ))}
            {requiredStatuses.map((status: EventRequireStatus) => {
              switch (status) {
                case EventRequireStatus.ATTENDED:
                  return <Chip key="attended">재학생</Chip>;
                case EventRequireStatus.ON_LEAVE:
                  return <Chip key="on_leave">휴학생</Chip>;
                case EventRequireStatus.GRADUATED:
                  return <Chip key="graduated">졸업생</Chip>;
                default:
                  return <Chip key="unknown">알 수 없음</Chip>;
              }
            })}
            {event.require_union_fee && <Chip key="union_fee">납부자만</Chip>}
          </div>
          <Divider />
        </div>
        <p className="grow overflow-y-auto txt-body1 text-gray-800">
          {event.description}
        </p>
      </div>
      <Button
        size="footer"
        disabled={isUserLoading || !canParticipate}
        onClick={handleParticipateClick}
        aria-describedby={
          !canParticipate && !isUserLoading ? "participate-hint" : undefined
        }
      >
        {isUserLoading
          ? "사용자 정보를 불러오는 중..."
          : canParticipate
            ? "참여하기"
            : "참여할 수 없는 이벤트입니다"}
      </Button>
      {!canParticipate && !isUserLoading && (
        <span id="participate-hint" className="sr-only">
          참여 조건을 충족하지 않습니다. 학적 상태나 학과 조건을 확인해주세요.
        </span>
      )}
    </div>
  );
}
