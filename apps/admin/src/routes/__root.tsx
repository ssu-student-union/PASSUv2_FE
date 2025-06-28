import SideBar from "@/components/\bSideBar";
import { Outlet, createRootRoute, useMatchRoute } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

const HIDE_SIDEBAR_PATHS = ["/login", "/callback", "/event/create"];

export const Route = createRootRoute({
  component: RootLayout,
});

function RootLayout() {
  const matchRoute = useMatchRoute();
  const isHideSidebar = HIDE_SIDEBAR_PATHS.some((path) =>
    matchRoute({ to: path, fuzzy: false }),
  );
  return (
    <>
      <div className="flex h-screen">
        {!isHideSidebar && <SideBar />}
        <main className="flex-1">
          <Outlet />
        </main>
      </div>

      <TanStackRouterDevtools />
    </>
  );
}
