import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@passu/ui/button";
import { Header } from "@/components/Header";
import { useNavigate } from "@tanstack/react-router";
import { useEventDetail } from "@/api/event";
import { LoadingState } from "@/components/PageStates";

export const Route = createFileRoute("/event/$id/enrolled")({
  component: EventEnrolledPage,
});

// Import local party popper emoji asset
import partyPopperSvg from "@/assets/party-popper.svg";
import { useUserInfo } from "@/api/user";

function EventEnrolledPage() {
  const { id } = Route.useParams();
  const navigate = useNavigate();

  // 행사 정보 조회
  const { data: eventData, isLoading: isEventLoading } = useEventDetail(id);

  // 사용자 정보 조회
  const { data: userInfo, isLoading: isUserLoading } = useUserInfo();

  const handleSurveyClick = () => {
    // 실제 설문조사 URL로 이동하거나 외부 링크 처리
    // 현재는 행사 목록으로 돌아가기
    void navigate({ to: "/" });
  };

  // 로딩 중일 때
  if (isEventLoading || isUserLoading) {
    return <LoadingState />;
  }

  const event = eventData?.result ? eventData.data : undefined;
  const user = userInfo?.result ? userInfo.data : undefined;

  return (
    <div className="flex size-full flex-col">
      <Header />
      <div
        className="flex grow flex-col items-center justify-center gap-7"
        style={{ viewTransitionName: "enrolled-content" }}
      >
        <img
          alt="Party popper emoji"
          className="size-32"
          src={partyPopperSvg}
        />
        <div className="text-center">
          <p className="text-2xl text-gray-800">
            {event?.name
              ? `${event.name} 등록이 완료되었습니다!`
              : "등록이 완료되었습니다!"}
          </p>
          {user && (
            <p className="mt-4 text-base text-gray-600">
              {user.name}님, 상품을 수령해주세요!
            </p>
          )}
        </div>
      </div>
      <Button
        size="footer"
        onClick={handleSurveyClick}
        style={{ viewTransitionName: "footer-button" }}
      >
        설문조사 참여하기
      </Button>
    </div>
  );
}
