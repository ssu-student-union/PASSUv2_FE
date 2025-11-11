import { createFileRoute, Link } from "@tanstack/react-router";
import { LogOut, Plus } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarMenu,
  SidebarMenuItem,
  SidebarTrigger,
} from "@passu/ui/sidebar";
import { PassuLogo } from "@passu/ui/passu-logo";
import { EventAccordion } from "@/components/home/EventAccordion";
import { useUserInfo } from "@/api/event";
import { EventStatus } from "@/types/event";
import { SidebarButton } from "@/components/sidebar/SidebarButton";
import { authGuard } from "@/lib/authGuard";

export const Route = createFileRoute("/")({
  beforeLoad: authGuard,
  component: App,
});

function App() {
  // const { data } = useUserInfo();
  // const userName = data?.data?.name ?? data?.data?.major;

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    window.location.href = "/login";
  };

  return (
    <>
      <Sidebar>
        <SidebarContent>
          <div className="mt-15 p-6">
            <PassuLogo className="w-full" />
          </div>

          <SidebarGroup>
            <SidebarMenu className="gap-4">
              <SidebarMenuItem>
                <SidebarButton asChild>
                  <Link to="/event/create">
                    <Plus />
                    <span>행사 생성</span>
                  </Link>
                </SidebarButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarButton variant="outline" onClick={handleLogout}>
                  <LogOut />
                  <span>로그아웃</span>
                </SidebarButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>

      <main className="flex flex-1 flex-col overflow-y-auto">
        <header className={`flex items-center justify-between p-3`}>
          <SidebarTrigger />
        </header>

        <div
          className={`
            flex flex-1 flex-col px-8 pt-4 pb-10
            sm:px-6
            lg:px-20 lg:pt-10
          `}
        >
          <div
            className={`
              mb-6 flex flex-col gap-2
              sm:flex-row sm:items-end
            `}
          >
            <span
              className={`
                text-2xl font-bold
                sm:text-3xl
                lg:text-4xl
              `}
            >
              {/* {userName} */}
            </span>
            <span
              className={`
                text-base
                sm:text-lg
                lg:text-xl
              `}
            >
              님의 행사 목록
            </span>
          </div>

          <div
            className={`
              flex flex-1 flex-col gap-6 overflow-y-auto rounded-2xl bg-white
              p-4
              lg:gap-12 lg:rounded-3xl lg:p-5
            `}
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            <EventAccordion type={EventStatus.BEFORE} />
            <EventAccordion type={EventStatus.PAUSE} />
            <EventAccordion type={EventStatus.AFTER} />
          </div>
        </div>
      </main>
    </>
  );
}
