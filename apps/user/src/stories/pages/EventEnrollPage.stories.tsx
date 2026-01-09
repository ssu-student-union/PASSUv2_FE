import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "@passu/ui/button";
import { Header } from "@/components/Header";
import { useIssueRandomKey } from "@/api/event";
import { useEffect, useState } from "react";
import { Divider } from "@passu/ui/divider";
import {
  randomKeySuccessHandler,
  randomKeyErrorHandler,
  studentInfoSuccessHandler,
} from "@/mocks/storybook-handlers";

interface EventEnrollPageProps {
  eventId: string;
}

function EventEnrollPage({ eventId }: EventEnrollPageProps) {
  const [randomKey, setRandomKey] = useState<string | null>(null);
  const [enrollmentStatus, setEnrollmentStatus] = useState<
    "idle" | "issuing" | "ready" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const { mutate: issueRandomKey } = useIssueRandomKey({
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
      issueRandomKey({ eventId });
    }
  }, [enrollmentStatus, eventId, issueRandomKey]);

  const handleRetry = () => {
    setEnrollmentStatus("issuing");
    setErrorMessage("");
    issueRandomKey({ eventId });
  };

  const handleGoBack = () => {
    alert("뒤로가기 - 실제로는 상세 페이지로 이동합니다");
  };

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

const meta: Meta<typeof EventEnrollPage> = {
  title: "Pages/랜덤 키 발급",
  component: EventEnrollPage,
  parameters: {
    layout: "fullscreen",
  },
  args: {
    eventId: "1",
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Success: Story = {
  name: "성공 - 랜덤 키 발급",
  args: {
    eventId: "1",
  },
  parameters: {
    msw: {
      handlers: {
        randomKey: randomKeySuccessHandler,
        studentInfo: studentInfoSuccessHandler,
      },
    },
  },
};

export const Error: Story = {
  name: "실패 - 랜덤 키 발급 실패",
  args: {
    eventId: "1",
  },
  parameters: {
    msw: {
      handlers: {
        randomKey: randomKeyErrorHandler,
        studentInfo: studentInfoSuccessHandler,
      },
    },
  },
};
