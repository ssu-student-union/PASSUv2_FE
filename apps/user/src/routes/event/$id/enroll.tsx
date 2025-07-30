import { createFileRoute } from "@tanstack/react-router";
import { PassuLogo } from "@passu/ui/passu-logo";
import { Button } from "@passu/ui/button";
import { useNavigate } from "@tanstack/react-router";
import { useIssueRandomKey } from "@/api/event";
import { useEffect, useState } from "react";
import { Divider } from "@passu/ui/divider";

export const Route = createFileRoute("/event/$id/enroll")({
  component: EventEnrollPage,
});

function EventEnrollPage() {
  const { id } = Route.useParams();
  const navigate = useNavigate();
  const [randomKey, setRandomKey] = useState<string | null>(null);
  const [enrollmentStatus, setEnrollmentStatus] = useState<
    "idle" | "issuing" | "ready" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // 랜덤 키 발급 mutation
  const issueKeyMutation = useIssueRandomKey({
    onSuccess: (data) => {
      setRandomKey(data.data.randomKey);
      setEnrollmentStatus("ready");
    },
    onError: (error) => {
      setErrorMessage(error.message || "랜덤 키 발급에 실패했습니다.");
      setEnrollmentStatus("error");
    },
  });

  useEffect(() => {
    if (enrollmentStatus === "idle") {
      setEnrollmentStatus("issuing");
      issueKeyMutation.mutate(id);
    }
  }, [enrollmentStatus, id, issueKeyMutation]);

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

  return (
    <div
      className={`
        flex size-full flex-col content-stretch items-start justify-start gap-4
        px-6 pt-4
      `}
    >
      <PassuLogo className="h-9" />
      <div
        className={`
          flex w-full grow flex-col content-stretch items-center justify-center
          gap-8
        `}
      >
        <div>
          <p
            className={`
              w-full shrink-0 text-center text-8xl leading-[normal] font-bold
              tracking-[-1.92px] text-black
            `}
          >
            {enrollmentStatus === "issuing" ? "..." : (randomKey ?? "----")}
          </p>
          <Divider />
        </div>
        <p className={`text-center txt-subtitle1`}>
          {enrollmentStatus === "issuing"
            ? "랜덤 키를 발급하고 있습니다..."
            : "화면을 학생회에게 보여주세요."}
        </p>
      </div>
    </div>
  );
}
