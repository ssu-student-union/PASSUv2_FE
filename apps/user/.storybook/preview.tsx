import type { Preview } from "@storybook/react-vite";
import { initialize, mswLoader } from "msw-storybook-addon";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider as JotaiProvider } from "jotai";
import type { ReactNode } from "react";
import "./tailwind.css";

// MSW 초기화
initialize();

// 스토리북용 QueryClient (각 스토리마다 새로 생성)
function createQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        staleTime: Infinity,
      },
    },
  });
}

// React Query + Jotai Provider wrapper
function Providers({ children }: { children: ReactNode }) {
  const queryClient = createQueryClient();
  return (
    <JotaiProvider>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </JotaiProvider>
  );
}

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    layout: "fullscreen",
    a11y: {
      test: "todo",
    },
  },
  loaders: [mswLoader],
  decorators: [
    (Story) => (
      <Providers>
        <div className="h-screen bg-gray-100">
          <Story />
        </div>
      </Providers>
    ),
  ],
};

export default preview;
