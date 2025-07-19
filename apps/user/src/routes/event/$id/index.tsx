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
    const currentUrl = encodeURIComponent(window.location.origin);
    window.location.href = `https://stu.ssu.ac.kr/register/redirect?redirect=${currentUrl}/auth/callback`;
  };

  return (
    <div
      className={`
        relative box-border flex size-full flex-col content-stretch items-start
        justify-start bg-[#ffffff] p-0
      `}
      data-name="1. 수령증 페이지 접속"
      id="node-1252_571"
    >
      <div
        className={`
          relative box-border flex min-h-px w-full min-w-px shrink-0 grow
          basis-0 flex-col content-stretch items-center justify-center p-0
        `}
        data-name="View"
        id="node-1267_1340"
      >
        <div
          className={`
            relative box-border flex min-h-px w-[336px] min-w-px shrink-0 grow
            basis-0 flex-col content-stretch items-center justify-center gap-11
            p-0
          `}
          data-name="Content"
          id="node-1267_1339"
        >
          <div
            className={`
              relative box-border flex w-full shrink-0 flex-col content-stretch
              items-center justify-start gap-8 px-0 pt-0 pb-[120px]
            `}
            data-name="Inner Content"
            id="node-1267_2025"
          >
            <div
              className="relative h-9 w-[168px] shrink-0"
              data-name="PASSU logo"
              id="node-1351_1551"
            >
              <PassuLogo />
            </div>
            <div
              className={`
                relative min-w-full shrink-0 text-center text-[28px] leading-[0]
                text-[rgba(0,0,0,0.8)] not-italic
                font-['Pretendard:Bold',_sans-serif]
              `}
              id="node-1252_574"
              style={{ width: "min-content" }}
            >
              <p className="block leading-[normal]">
                2025-1학기 IT대학 중간고사 간식 행사
              </p>
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
    </div>
  );
}
