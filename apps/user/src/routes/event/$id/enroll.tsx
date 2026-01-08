import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@passu/ui/button";
import { Header } from "@/components/Header";
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
      if (data.result) {
        setRandomKey(data.data.random_key);
        setEnrollmentStatus("ready");
      }
    },
    onError: (error) => {
      setErrorMessage(error.message || "랜덤 키 발급에 실패했습니다.");
      setEnrollmentStatus("error");
    },
  });

  useEffect(() => {
    if (enrollmentStatus === "idle") {
      setEnrollmentStatus("issuing");
      issueKeyMutation.mutate({ eventId: id });
    }
  }, [enrollmentStatus, id, issueKeyMutation]);

  const handleRetry = () => {
    setEnrollmentStatus("issuing");
    setErrorMessage("");
    issueKeyMutation.mutate({ eventId: id });
  };

  const handleGoBack = () => {
    void navigate({ to: "/event/$id/detail", params: { id } });
  };

  // 에러 상태
  if (enrollmentStatus === "error") {
    return (
      <div className="flex size-full flex-col">
        <Header />
        <div className="flex grow flex-col items-center justify-center gap-4">
          <p className="txt-h2 text-gray-800">오류가 발생했습니다</p>
          <p className="text-base text-gray-600">{errorMessage}</p>
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleGoBack}>
              돌아가기
            </Button>
            <Button onClick={handleRetry}>다시 시도</Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex size-full flex-col">
      <Header />
      <div className="flex grow flex-col items-center justify-center gap-8">
        <div className="text-center">
          <p className={`text-8xl font-bold tracking-[-1.92px] text-black`}>
            {enrollmentStatus === "issuing" ? "..." : (randomKey ?? "----")}
          </p>
          <Divider />
        </div>
        <p className="txt-subtitle1">
          {enrollmentStatus === "issuing"
            ? "랜덤 키를 발급하고 있습니다..."
            : "화면을 학생회에게 보여주세요."}
        </p>
      </div>
    </div>
  );
}
