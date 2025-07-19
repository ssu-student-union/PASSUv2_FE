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

export const Route = createFileRoute("/event/$id/")({
  component: EventIdPage,
});

function EventIdPage() {
  const { id } = Route.useParams();
  const [accessToken] = useAtom(accessTokenAtom);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleParticipateClick = () => {
    if (!accessToken) {
      setIsModalOpen(true);
    } else {
      void navigate({ to: `/event/${id}/detail` });
    }
  };

  const handleLoginRedirect = () => {
    const redirectUrl = `${window.location.origin}/auth/callback?to=/event/${id}`;
    const encodedRedirectUrl = encodeURIComponent(redirectUrl);
    window.location.href = `https://stu.ssu.ac.kr/register/redirect?redirect=${encodedRedirectUrl}`;
  };

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
              <p>2025-1학기 IT대학 중간고사 간식 행사</p>
            </div>
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
