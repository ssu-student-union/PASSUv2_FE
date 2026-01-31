import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@passu/ui/button";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalTitle,
  ModalDescription,
  ModalFooter,
} from "@passu/ui/modal";
import { useAtom } from "jotai";
import { accessTokenAtom } from "@/atoms/auth";
import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { useEventDetail } from "@/api/event";
import { LoadingState, ErrorState } from "@/components/PageStates";
import { Header } from "@/components/Header";

export const Route = createFileRoute("/event/$id/")({
  component: EventIdPage,
});

function EventIdPage() {
  const { id } = Route.useParams();
  const [accessToken] = useAtom(accessTokenAtom);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  // 행사 상세 정보 조회
  const { data: eventData, isLoading } = useEventDetail(id);

  const handleParticipateClick = () => {
    if (!accessToken) {
      setIsModalOpen(true);
    } else {
      void navigate({ to: "/event/$id/detail", params: { id } });
    }
  };

  const handleLoginRedirect = () => {
    const redirectUrl = `${window.location.origin}/auth/callback?to=/event/${id}/detail`;
    const encodedRedirectUrl = encodeURIComponent(redirectUrl);
    window.location.href = `https://stu.ssu.ac.kr/register/redirect?redirect=${encodedRedirectUrl}`;
  };

  // 로딩 상태
  if (isLoading) {
    return <LoadingState message="행사 정보를 불러오는 중..." />;
  }

  // 행사 데이터가 없는 경우
  if (!eventData?.result) {
    return <ErrorState message="행사를 찾을 수 없습니다." />;
  }

  return (
    <>
      <div className="flex size-full flex-col">
        <Header />
        <div className="flex grow flex-col items-center justify-center gap-8">
          <h2 className="txt-h2 text-gray-800">{eventData.data.name}</h2>
          {eventData.data.description && (
            <p className="max-w-md truncate text-center text-base text-gray-600">
              {eventData.data.description}
            </p>
          )}
        </div>
        <Button
          size="footer"
          onClick={handleParticipateClick}
          style={{ viewTransitionName: "footer-button" }}
        >
          참여하기
        </Button>
      </div>

      <Modal open={isModalOpen} onOpenChange={setIsModalOpen}>
        <ModalContent>
          <ModalHeader>
            <ModalTitle>로그인 필요</ModalTitle>
            <ModalDescription>
              행사에 참여하려면 로그인이 필요합니다.
            </ModalDescription>
          </ModalHeader>
          <ModalFooter>
            <Button variant="outline" onClick={() => setIsModalOpen(false)}>
              취소
            </Button>
            <Button onClick={handleLoginRedirect}>로그인</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
