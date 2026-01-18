import { Button } from "@passu/ui/button";
import { PassuLogo } from "@passu/ui/passu-logo";
import type { ErrorBoundaryFallbackProps } from "@suspensive/react";

export function ErrorFallback({ error, reset }: ErrorBoundaryFallbackProps) {
  const handleReload = () => {
    window.location.reload();
  };

  const handleGoHome = () => {
    window.location.href = "/";
  };

  return (
    <div className="flex w-full flex-col items-center justify-start gap-8">
      <PassuLogo className="h-9" />
      <div className="flex flex-col items-center justify-start gap-6">
        <div className="flex flex-col items-center justify-start gap-1">
          <h1 className="text-center text-2xl font-semibold text-gray-900">
            오류가 발생했습니다
          </h1>
          <p className="text-center text-base text-gray-600">{error.message}</p>
        </div>
      </div>
      <div className="flex w-full flex-col items-start justify-start gap-3">
        {process.env.NODE_ENV === "development" && (
          <details className="mt-4 w-full text-left">
            <summary className="cursor-pointer text-sm text-gray-500">
              개발자 정보 (클릭하여 보기)
            </summary>
            <pre className="mt-2 overflow-auto rounded bg-gray-100 p-2 text-xs">
              {error.stack ?? error.toString()}
            </pre>
          </details>
        )}
        <div className="flex w-full gap-2">
          <Button variant="outline" className="flex-1" onClick={reset}>
            다시 시도
          </Button>
          <Button variant="outline" className="flex-1" onClick={handleReload}>
            새로고침
          </Button>
          <Button className="flex-1" onClick={handleGoHome}>
            홈으로 가기
          </Button>
        </div>
      </div>
    </div>
  );
}
