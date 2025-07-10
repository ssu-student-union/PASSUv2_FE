import { Outlet, createRootRoute } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

export const Route = createRootRoute({
  component: RootLayout,
});

function RootLayout() {
  return (
    <>
      <main className="flex h-full bg-background">
        <div className="w-full">
          <Outlet />
        </div>
      </main>
      <TanStackRouterDevtools />
    </>
  );
}
