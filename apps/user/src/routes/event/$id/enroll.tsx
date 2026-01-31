import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { useIssueRandomKey, useIsEnrolled } from "@/api/event";
import { useEffect, useState } from "react";
import { Divider } from "@passu/ui/divider";
import { Button } from "@passu/ui/button";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalTitle,
  ModalDescription,
  ModalFooter,
} from "@passu/ui/modal";

export const Route = createFileRoute("/event/$id/enroll")({
  component: EventEnrollPage,
});

function EventEnrollPage() {
  const { id } = Route.useParams();
  const navigate = useNavigate();
  const [randomKey, setRandomKey] = useState<string | null>(null);
  const [isIssuing, setIsIssuing] = useState(true);
  const [isVerifying, setIsVerifying] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  // 등록 여부 확인 쿼리 (수동으로 호출)
  const { refetch: checkEnrolled } = useIsEnrolled(id, {
    enabled: false,
  });

  // 랜덤 키 발급 mutation
  const { mutate: issueRandomKey } = useIssueRandomKey({
    onSuccess: (data) => {
      if (data.result) {
        setRandomKey(data.data.random_key);
        setIsIssuing(false);
      }
    },
    throwOnError: true,
  });

  // 컴포넌트 마운트 시 랜덤 키 발급
  useEffect(() => {
    issueRandomKey({ eventId: id });
  }, [id, issueRandomKey]);

  const handleConfirm = async () => {
    setIsVerifying(true);
    try {
      const result = await checkEnrolled();
      if (result.data?.result && result.data.data === true) {
        // 등록 완료된 경우 enrolled 페이지로 이동
        void navigate({ to: "/event/$id/enrolled", params: { id } });
      } else {
        // 등록되지 않은 경우 모달 표시
        setErrorMessage(
          "아직 물품 수령이 완료되지 않았습니다. 학생회에게 다시 확인해주세요.",
        );
        setShowErrorModal(true);
      }
    } catch {
      setErrorMessage(
        "등록 확인 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.",
      );
      setShowErrorModal(true);
    } finally {
      setIsVerifying(false);
    }
  };

  const handleCloseModal = () => {
    setShowErrorModal(false);
  };

  return (
    <div className="flex size-full flex-col">
      <Header />
      <div
        className="flex grow flex-col items-center justify-center gap-8"
        aria-live="polite"
        aria-busy={isIssuing}
      >
        <div className="text-center">
          <p className="text-8xl font-bold tracking-[-1.92px] text-black">
            {isIssuing ? "..." : (randomKey ?? "----")}
          </p>
          <Divider />
        </div>
        <p className="txt-subtitle1">
          {isIssuing
            ? "랜덤 키를 발급하고 있습니다..."
            : "화면을 학생회에게 보여주세요."}
        </p>
      </div>
      <Button
        size="footer"
        disabled={isIssuing || !randomKey || isVerifying}
        onClick={() => void handleConfirm()}
        style={{ viewTransitionName: "footer-button" }}
      >
        {isVerifying ? "확인 중..." : "확인 완료"}
      </Button>

      <Modal open={showErrorModal} onOpenChange={setShowErrorModal}>
        <ModalContent showCloseButton={false}>
          <ModalHeader>
            <ModalTitle>등록 확인 실패</ModalTitle>
            <ModalDescription>{errorMessage}</ModalDescription>
          </ModalHeader>
          <ModalFooter>
            <Button onClick={handleCloseModal} className="w-full">
              확인
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}
