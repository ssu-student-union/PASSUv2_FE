import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { useIssueRandomKey } from "@/api/event";
import { useEffect, useState } from "react";
import { Divider } from "@passu/ui/divider";
import { Button } from "@passu/ui/button";

export const Route = createFileRoute("/event/$id/enroll")({
  component: EventEnrollPage,
});

function EventEnrollPage() {
  const { id } = Route.useParams();
  const navigate = useNavigate();
  const [randomKey, setRandomKey] = useState<string | null>(null);
  const [isIssuing, setIsIssuing] = useState(true);

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

  useEffect(() => {
    issueRandomKey({ eventId: id });
  }, [id, issueRandomKey]);

  const handleConfirm = () => {
    void navigate({ to: "/event/$id/enrolled", params: { id } });
  };

  return (
    <div className="flex size-full flex-col">
      <Header />
      <div className="flex grow flex-col items-center justify-center gap-8">
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
        disabled={isIssuing || !randomKey}
        onClick={handleConfirm}
      >
        확인 완료
      </Button>
    </div>
  );
}
