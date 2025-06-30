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
      <div className="flex h-full bg-background">
        {!isHideSidebar && (
          <div className={`max-w-104 min-w-80 basis-1/5`}>
            <SideBar />
          </div>
        )}
        <main className="flex-1">
          <Outlet />
        </main>
      </div>

      <TanStackRouterDevtools />
    </>
  );
}
