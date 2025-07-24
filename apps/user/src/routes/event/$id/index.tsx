import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@passu/ui/button";
import { PassuLogo } from "@passu/ui/passu-logo";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalTitle,
  ModalDescription,
} from "@passu/ui/modal";
import { useAtom } from "jotai";
import { accessTokenAtom } from "@/atoms/auth";
import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { useEventDetail } from "@/api/event";

export const Route = createFileRoute("/event/$id/")({
  component: EventIdPage,
});

function EventIdPage() {
  const { id } = Route.useParams();
  const [accessToken] = useAtom(accessTokenAtom);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  // 이벤트 상세 정보 조회
  const { data: eventData, isLoading, error } = useEventDetail(id);

  const handleParticipateClick = () => {
    if (!accessToken) {
      setIsModalOpen(true);
    } else {
      void navigate({ to: "/event/$id/detail", params: { id } });
    }
  };

  const handleLoginRedirect = () => {
    const redirectUrl = `${window.location.origin}/auth/callback?to=/event/${id}`;
    const encodedRedirectUrl = encodeURIComponent(redirectUrl);
    window.location.href = `https://stu.ssu.ac.kr/register/redirect?redirect=${encodedRedirectUrl}`;
  };

  // 로딩 상태
  if (isLoading) {
    return (
      <div className="flex size-full flex-col items-center justify-center">
        <div className="w-full text-center txt-h2 text-gray-800">
          <p>이벤트 정보를 불러오는 중...</p>
        </div>
      </div>
    );
  }

  // 에러 상태
  if (error) {
    return (
      <div className="flex size-full flex-col items-center justify-center">
        <div className="w-full text-center txt-h2 text-gray-800">
          <p>이벤트를 불러오는 중 오류가 발생했습니다.</p>
          <p className="mt-2 text-sm text-gray-600">{error.message}</p>
        </div>
        <Button className="mt-4" onClick={() => void navigate({ to: "/" })}>
          홈으로 돌아가기
        </Button>
      </div>
    );
  }

  // 이벤트 데이터가 없는 경우
  if (!eventData?.data) {
    return (
      <div className="flex size-full flex-col items-center justify-center">
        <div className="w-full text-center txt-h2 text-gray-800">
          <p>이벤트를 찾을 수 없습니다.</p>
        </div>
        <Button className="mt-4" onClick={() => void navigate({ to: "/" })}>
          홈으로 돌아가기
        </Button>
      </div>
    );
  }

  return (
    <>
      <div className="flex size-full flex-col items-center justify-center">
        <div
          className={`
            flex w-[336px] grow basis-0 flex-col items-center justify-center
            gap-11
          `}
        >
          <div
            className={`
              flex w-full flex-col items-center justify-start gap-8 pb-[120px]
            `}
          >
            <PassuLogo className="h-9" />
            <div className="min-w-full text-center txt-h2 text-gray-800">
              <p>{eventData.data.name}</p>
            </div>
            {eventData.data.description && (
              <div className="min-w-full text-center text-base text-gray-600">
                <p>{eventData.data.description}</p>
              </div>
            )}
          </div>
        </div>
        <Button size="footer" onClick={handleParticipateClick}>
          참여하기
        </Button>
      </div>

      <Modal open={isModalOpen} onOpenChange={setIsModalOpen}>
        <ModalContent>
          <ModalHeader>
            <ModalTitle>로그인 필요</ModalTitle>
            <ModalDescription>
              이벤트에 참여하려면 로그인이 필요합니다.
            </ModalDescription>
          </ModalHeader>
          <div className="flex justify-end gap-2 p-4">
            <Button variant="outline" onClick={() => setIsModalOpen(false)}>
              취소
            </Button>
            <Button onClick={handleLoginRedirect}>로그인</Button>
          </div>
        </ModalContent>
      </Modal>
    </>
  );
}
