import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@passu/ui/button";
import { PassuLogo } from "@passu/ui/passu-logo";
import { Chip } from "@passu/ui/chip";
import { Divider } from "@passu/ui/divider";
import { useNavigate } from "@tanstack/react-router";
import { useEventDetail, useEnrolledCount } from "@/api/event";
import { EventRequireStatus } from "@/model/api";

export const Route = createFileRoute("/event/$id/detail")({
  component: EventDetailPage,
});

function EventDetailPage() {
  const { id } = Route.useParams();
  const navigate = useNavigate();

  // 이벤트 상세 정보 조회
  const {
    data: eventData,
    isLoading: isEventLoading,
    error: eventError,
  } = useEventDetail(id);

  // 등록 학생 수 조회
  const { data: enrolledCountData, isLoading: isCountLoading } =
    useEnrolledCount(id);

  const handleParticipateClick = () => {
    void navigate({ to: "/event/$id/enroll", params: { id } });
  };

  // 로딩 상태
  if (isEventLoading) {
    return (
      <div className="flex size-full flex-col items-center justify-center">
        <div className="w-full text-center txt-h2 text-gray-800">
          <p>이벤트 정보를 불러오는 중...</p>
        </div>
      </div>
    );
  }

  // 에러 상태
  if (eventError) {
    return (
      <div className="flex size-full flex-col items-center justify-center">
        <div
          className={`
            flex w-full grow flex-col items-center justify-center text-center
            txt-h2 text-gray-800
          `}
        >
          <p>이벤트를 불러오는 중 오류가 발생했습니다.</p>
          <p className="mt-2 text-sm text-gray-600">{eventError.message}</p>
        </div>
        <Button size="footer" asChild>
          <Link to="/">홈으로 돌아가기</Link>
        </Button>
      </div>
    );
  }

  // 이벤트 데이터가 없는 경우
  if (!eventData?.data) {
    return (
      <div className="flex size-full flex-col items-center justify-center">
        <div
          className={`
            flex w-full grow flex-col items-center justify-center text-center
            txt-h2 text-gray-800
          `}
        >
          <p>이벤트를 찾을 수 없습니다.</p>
        </div>
        <Button size="footer" asChild>
          <Link to="/">홈으로 돌아가기</Link>
        </Button>
      </div>
    );
  }

  const event = eventData.data;
  const enrolledCount = enrolledCountData?.data?.enrolled_count ?? 0;

  return (
    <div className="flex size-full flex-col items-center justify-between">
      <div
        className={`
          flex size-full flex-col items-start justify-start gap-4 px-6 pt-4
        `}
      >
        <PassuLogo className="h-9" />
        <div className={`flex w-full flex-col items-start justify-start gap-5`}>
          <h2 className="w-full text-left txt-h2 text-gray-800">
            {event.name}
          </h2>
          <div
            className={`
              flex w-full flex-wrap content-start items-start justify-start
              gap-2
            `}
          >
            <Chip className={`flex items-center justify-between`}>
              <span>잔여수량</span>
              <span>
                <span className="font-bold">
                  {isCountLoading ? "..." : enrolledCount}
                </span>
                <span>/</span>
                <span>{event.product_quantity}</span>
                <span> 명</span>
              </span>
            </Chip>
            {event.allowed_departments.map((major) => (
              <Chip key={major}>{major}</Chip>
            ))}
            {(() => {
              switch (event.require_status) {
                case EventRequireStatus.ATTENDED:
                  return <Chip key="attended">재학생</Chip>;
                case EventRequireStatus.ON_LEAVE:
                  return <Chip key="on_leave">휴학생</Chip>;
                case EventRequireStatus.GRADUATED:
                  return <Chip key="graduated">졸업생</Chip>;
                default:
                  return <Chip key="unknown">알 수 없음</Chip>;
              }
            })()}
          </div>
          <Divider />
        </div>
        <p
          className={`
            w-full overflow-y-auto text-left txt-body1 leading-[normal]
            text-gray-800
          `}
        >
          {event.description}
        </p>
      </div>
      <Button size="footer" onClick={handleParticipateClick}>
        참여하기
      </Button>
    </div>
  );
}
