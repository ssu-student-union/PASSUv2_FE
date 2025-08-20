import { createFileRoute, Link } from "@tanstack/react-router";
import { LogOut, Plus } from "lucide-react";

import { Sidebar } from "@/components/sidebar/Sidebar";
import { SidebarButtonGroup } from "@/components/sidebar/SidebarButtonGroup";
import { SidebarButton } from "@/components/sidebar/SidebarButton";
import { EventAccordion } from "@/components/home/EventAccordion";
import { useEventList } from "@/api/event";

export const Route = createFileRoute("/")({
  component: App,
});

function App() {
  const { data: upcomingData } = useEventList("BEFORE");
  const { data: completedData } = useEventList("AFTER");

  const upcomingEvents = upcomingData?.data?.content ?? [];
  const completedEvents = completedData?.data?.content ?? [];

  return (
    <>
      <Sidebar>
        <SidebarButtonGroup>
          <SidebarButton asChild>
            <Link to="/event/create">
              <Plus />
              행사 생성
            </Link>
          </SidebarButton>

          <SidebarButton variant="outline">
            <LogOut />
            로그아웃
          </SidebarButton>
        </SidebarButtonGroup>
      </Sidebar>

      <div className="flex-1">
        <div className={`flex h-full w-full flex-col gap-6 px-20 pt-20 pb-10`}>
          <div className="flex items-end gap-2">
            <span className="text-4xl font-bold">총학생회</span>
            <span className="text-xl">님의 행사 목록</span>
          </div>

          <div
            className={`
              flex h-full flex-1 flex-col gap-12 overflow-y-scroll rounded-3xl
              bg-white p-5
            `}
          >
            <EventAccordion variant="upcoming" events={upcomingEvents} />

            <EventAccordion variant="completed" events={completedEvents} />
          </div>
        </div>
      </div>
    </>
  );
}
