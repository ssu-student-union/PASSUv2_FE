import { SidebarProvider } from "@passu/ui/sidebar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Outlet, createRootRoute } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

const queryClient = new QueryClient();

export const Route = createRootRoute({
  component: RootLayout,
});

function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <>
        <div className="flex h-full w-full bg-background">
          <SidebarProvider>
            <Outlet />
          </SidebarProvider>
        </div>

        <div className="print:hidden">
          <ReactQueryDevtools initialIsOpen={false} />
          <TanStackRouterDevtools />
        </div>
      </>
    </QueryClientProvider>
  );
}
