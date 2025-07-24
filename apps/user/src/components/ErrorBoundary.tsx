import { Component } from "react";
import type { ErrorInfo, ReactNode } from "react";
import { Button } from "@passu/ui/button";
import { PassuLogo } from "@passu/ui/passu-logo";

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    // 다음 렌더링에서 폴백 UI가 보이도록 상태를 업데이트 합니다.
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // 에러 리포팅 서비스에 에러를 기록할 수도 있습니다
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  private handleReload = () => {
    window.location.reload();
  };

  private handleGoHome = () => {
    window.location.href = "/";
  };

  render() {
    if (this.state.hasError) {
      return (
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
              <div className="flex flex-col items-center justify-start gap-6">
                <div className="flex flex-col items-center justify-start gap-1">
                  <h1
                    className={`
                      text-center text-2xl font-semibold text-gray-900
                    `}
                  >
                    오류가 발생했습니다
                  </h1>
                  <p className="text-center text-base text-gray-600">
                    예상치 못한 오류가 발생했습니다. 다시 시도해 주세요.
                  </p>
                </div>
              </div>
              <div
                className={`
                  flex w-full flex-col items-start justify-start gap-3
                `}
              >
                {process.env.NODE_ENV === "development" && this.state.error && (
                  <details className="mt-4 text-left">
                    <summary className="cursor-pointer text-sm text-gray-500">
                      개발자 정보 (클릭하여 보기)
                    </summary>
                    <pre
                      className={`
                        mt-2 overflow-auto rounded bg-gray-100 p-2 text-xs
                      `}
                    >
                      {this.state.error.toString()}
                    </pre>
                  </details>
                )}
                <div className="flex w-full gap-2">
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={this.handleReload}
                  >
                    새로고침
                  </Button>
                  <Button className="flex-1" onClick={this.handleGoHome}>
                    홈으로 가기
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
