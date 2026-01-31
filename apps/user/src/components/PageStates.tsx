import { Link } from "@tanstack/react-router";
import { Button } from "@passu/ui/button";
import { Header } from "@/components/Header";

interface LoadingStateProps {
  message?: string;
}

/**
 * 페이지 로딩 상태를 표시하는 공통 컴포넌트
 * 스크린 리더 지원을 위해 aria-live와 aria-busy 속성이 포함되어 있습니다.
 */
export function LoadingState({
  message = "정보를 불러오는 중...",
}: LoadingStateProps) {
  return (
    <div className="flex size-full flex-col">
      <Header />
      <div
        className="flex grow items-center justify-center"
        aria-live="polite"
        aria-busy={true}
      >
        <p className="txt-h2 text-gray-800">{message}</p>
      </div>
    </div>
  );
}

interface ErrorStateProps {
  message?: string;
  showHomeButton?: boolean;
}

/**
 * 페이지 에러 상태를 표시하는 공통 컴포넌트
 * 홈으로 돌아가기 버튼을 선택적으로 표시할 수 있습니다.
 */
export function ErrorState({
  message = "정보를 찾을 수 없습니다.",
  showHomeButton = true,
}: ErrorStateProps) {
  return (
    <div className="flex size-full flex-col">
      <Header />
      <div
        className={`flex grow flex-col items-center justify-center text-center`}
      >
        <p className="txt-h2 text-gray-800">{message}</p>
      </div>
      {showHomeButton && (
        <Button size="footer" asChild>
          <Link to="/">
            <span>홈으로 돌아가기</span>
          </Link>
        </Button>
      )}
    </div>
  );
}
