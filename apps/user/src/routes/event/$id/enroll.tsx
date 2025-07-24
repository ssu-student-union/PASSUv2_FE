import { createFileRoute } from "@tanstack/react-router";
import { PassuLogo } from "@passu/ui/passu-logo";
import { Button } from "@passu/ui/button";
import { useNavigate } from "@tanstack/react-router";
import { useIssueRandomKey, useEnrollStudent } from "@/api/event";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/event/$id/enroll")({
  component: EventEnrollPage,
});

function EventEnrollPage() {
  const { id } = Route.useParams();
  const navigate = useNavigate();
  const [randomKey, setRandomKey] = useState<string>("");
  const [enrollmentStatus, setEnrollmentStatus] = useState<
    "idle" | "issuing" | "ready" | "enrolling" | "enrolled" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");

  // 랜덤 키 발급 mutation
  const issueKeyMutation = useIssueRandomKey({
    onSuccess: (data) => {
      setRandomKey(data.data.randomKey);
      setEnrollmentStatus("ready");
      // 자동으로 학생 등록 진행
      enrollMutation.mutate({ eventId: id, randomKey: data.data.randomKey });
    },
    onError: (error) => {
      setErrorMessage(error.message || "랜덤 키 발급에 실패했습니다.");
      setEnrollmentStatus("error");
    },
  });

  // 학생 등록 mutation
  const enrollMutation = useEnrollStudent({
    onSuccess: () => {
      setEnrollmentStatus("enrolled");
      // 완료 페이지로 이동
      setTimeout(() => {
        void navigate({ to: "/event/$id/enrolled", params: { id } });
      }, 2000);
    },
    onError: (error) => {
      setErrorMessage(error.message || "학생 등록에 실패했습니다.");
      setEnrollmentStatus("error");
    },
  });

  // 컴포넌트 마운트 시 랜덤 키 발급 시작
  useEffect(() => {
    setEnrollmentStatus("issuing");
    issueKeyMutation.mutate(id);
  }, [id, issueKeyMutation]);

  const handleRetry = () => {
    setEnrollmentStatus("issuing");
    setErrorMessage("");
    issueKeyMutation.mutate(id);
  };

  const handleGoBack = () => {
    void navigate({ to: "/event/$id/detail", params: { id } });
  };

  // 에러 상태
  if (enrollmentStatus === "error") {
    return (
      <div className="flex size-full flex-col items-center justify-center">
        <div className="mb-6">
          <PassuLogo />
        </div>
        <div className="mb-4 w-full text-center txt-h2 text-gray-800">
          <p>오류가 발생했습니다</p>
        </div>
        <div className="mb-6 w-full text-center text-base text-gray-600">
          <p>{errorMessage}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleGoBack}>
            돌아가기
          </Button>
          <Button onClick={handleRetry}>다시 시도</Button>
        </div>
      </div>
    );
  }

  // 성공 상태 (잠시 표시 후 enrolled 페이지로 이동)
  if (enrollmentStatus === "enrolled") {
    return (
      <div className="flex size-full flex-col items-center justify-center">
        <div className="mb-6">
          <PassuLogo />
        </div>
        <div className="mb-4 w-full text-center txt-h2 text-gray-800">
          <p>등록 완료!</p>
        </div>
        <div className="w-full text-center text-base text-gray-600">
          <p>완료 페이지로 이동합니다...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative size-full" data-name="View">
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
              gap-[34px] p-0
            `}
            data-name="Content"
          >
            <div
              className={`
                relative box-border flex w-full shrink-0 flex-col
                content-stretch items-center justify-center gap-[34px] px-0 pt-0
                pb-[120px]
              `}
              data-name="Inner Center"
            >
              <div
                className={`
                  relative box-border flex shrink-0 flex-col content-stretch
                  items-center justify-start p-0
                `}
              >
                <div
                  className={`
                    relative w-full shrink-0 text-center text-[96px] leading-[0]
                    tracking-[-1.92px] text-[#000000] not-italic
                    font-['Pretendard:Bold',_sans-serif]
                  `}
                >
                  <p className="block leading-[normal]">
                    {enrollmentStatus === "issuing"
                      ? "..."
                      : enrollmentStatus === "enrolling"
                        ? "등록중"
                        : randomKey || "----"}
                  </p>
                </div>
                <div className="relative h-0 w-full shrink-0">
                  <div
                    className={`
                      absolute top-[-1px] right-[-0.459%] bottom-[-1px]
                      left-[-0.459%]
                    `}
                  >
                    <svg
                      width="100%"
                      height="2"
                      viewBox="0 0 218 2"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="block size-full max-w-none"
                    >
                      <path d="M0 1H218" stroke="#e0e0e0" strokeWidth="2" />
                    </svg>
                  </div>
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
                  {enrollmentStatus === "issuing"
                    ? "랜덤 키를 발급하고 있습니다..."
                    : enrollmentStatus === "ready"
                      ? "등록을 진행하고 있습니다..."
                      : enrollmentStatus === "enrolling"
                        ? "등록을 진행하고 있습니다..."
                        : "화면을 학생회에게 보여주세요."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
