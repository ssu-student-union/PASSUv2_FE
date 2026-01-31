import { Outlet, createRootRoute } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import {
  QueryClient,
  QueryClientProvider,
  QueryErrorResetBoundary,
} from "@tanstack/react-query";
import { ErrorBoundary } from "@suspensive/react";
import { ErrorFallback } from "../components/ErrorFallback";
import { useNavigationDirection } from "@/hooks/useNavigationDirection";

// QueryClient 인스턴스 생성
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      throwOnError: true,
    },
  },
});

function RootComponent() {
  // Navigation direction 감지 (View Transition 방향 설정)
  useNavigationDirection();

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <QueryErrorResetBoundary>
          {({ reset }) => (
            <ErrorBoundary
              onReset={reset}
              fallback={(props) => <ErrorFallback {...props} />}
            >
              <Outlet />
            </ErrorBoundary>
          )}
        </QueryErrorResetBoundary>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
      <TanStackRouterDevtools />
    </>
  );
}

export const Route = createRootRoute({
  component: RootComponent,
});
