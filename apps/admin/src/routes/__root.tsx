import SideBar from "@/components/\bSideBar";
import { Outlet, createRootRoute, useLocation } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

export const Route = createRootRoute({
  component: RootLayout,
});

function RootLayout() {
  const location = useLocation();
  console.log(location);
  const HideSidebarPaths = ["/login", "/callback", "/event/create"];
  const isHideSidebar = HideSidebarPaths.includes(location.pathname);
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
