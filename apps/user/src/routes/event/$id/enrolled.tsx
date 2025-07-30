import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@passu/ui/button";
import { PassuLogo } from "@passu/ui/passu-logo";
import { useNavigate } from "@tanstack/react-router";
import { useEventDetail, useUserInfo } from "@/api/event";

export const Route = createFileRoute("/event/$id/enrolled")({
  component: EventEnrolledPage,
});

// Import local party popper emoji asset
import partyPopperSvg from "@/assets/party-popper.svg";

function EventEnrolledPage() {
  const { id } = Route.useParams();
  const navigate = useNavigate();

  // 이벤트 정보 조회
  const { data: eventData, isLoading: isEventLoading } = useEventDetail(id);

  // 사용자 정보 조회
  const { data: userInfo, isLoading: isUserLoading } = useUserInfo();

  const handleSurveyClick = () => {
    // 실제 설문조사 URL로 이동하거나 외부 링크 처리
    // 현재는 이벤트 목록으로 돌아가기
    void navigate({ to: "/" });
  };

  // 로딩 중일 때
  if (isEventLoading || isUserLoading) {
    return (
      <div className="flex size-full items-center justify-center">
        <div className="text-center">
          <PassuLogo />
          <p className="mt-4 text-gray-600">정보를 불러오는 중...</p>
        </div>
      </div>
    );
  }

  const event = eventData?.data;
  const user = userInfo?.data;

  return (
    <div
      className={`
        relative box-border flex size-full flex-col content-stretch items-center
        justify-between p-0
      `}
      data-name="View"
    >
      <div
        className="relative min-h-px w-full min-w-px shrink-0 grow basis-0"
        data-name="Content"
      >
        <div className="relative size-full">
          <div
            className={`
              relative box-border flex size-full flex-col content-stretch
              items-start justify-start gap-4 px-6 pt-4 pb-0
            `}
          >
            <div
              className="relative h-[21px] w-[100px] shrink-0"
              data-name="PASSU logo"
            >
              <PassuLogo />
            </div>
            <div
              className={`
                relative box-border flex min-h-px w-full min-w-px shrink-0 grow
                basis-0 flex-col content-stretch items-center justify-center
                gap-7 p-0
              `}
              data-name="Inner Center Content"
            >
              <div
                className="relative size-36 shrink-0 overflow-clip"
                data-name="fluent-emoji:party-popper"
              >
                <div
                  className={`
                    absolute top-[6.505%] right-[8.989%] bottom-[6.375%]
                    left-[8.043%]
                  `}
                  data-name="Group"
                >
                  <img
                    alt="Party popper emoji"
                    className="block size-full max-w-none"
                    src={partyPopperSvg}
                  />
                </div>
              </div>
              <div
                className={`
                  relative min-w-full shrink-0 text-center text-[24px]
                  leading-[0] text-[rgba(0,0,0,0.8)] not-italic
                  font-['Pretendard:Regular',_sans-serif]
                `}
                style={{ width: "min-content" }}
              >
                <p className="block leading-[normal]">
                  {event?.name
                    ? `${event.name} 등록이 완료되었습니다!`
                    : "등록이 완료되었습니다!"}
                </p>
                {user && (
                  <div className="mt-4 text-center text-base text-gray-600">
                    <p>{user.name}님, 상품을 수령해주세요!</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Button
        size="footer"
        className={`h-24 w-full cursor-pointer font-bold text-white`}
        onClick={handleSurveyClick}
      >
        설문조사 참여하기
      </Button>
    </div>
  );
}
