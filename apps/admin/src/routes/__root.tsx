import { Outlet, createRootRoute } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

export const Route = createRootRoute({
  component: RootLayout,
});

function RootLayout() {
  return (
    <>
      <div className="flex h-full w-full bg-background">
        <Outlet />
      </div>

      <TanStackRouterDevtools />
    </>
  );
}
