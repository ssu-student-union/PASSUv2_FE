import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Button } from "@passu/ui/button";
import { PassuLogo } from "@passu/ui/passu-logo";
import type { SidebarConfig } from "@/types/router";
import { LogOut, Plus } from "lucide-react";
import PageLayout from "@/layouts/PageLayout";

export const Route = createFileRoute("/")({
  component: App,
});

function App() {
  const navigate = useNavigate();
  const config: SidebarConfig = {
    title: "홈",
    buttons: [
      {
        label: "행사 생성",
        icon: <Plus />,
        variant: "default",
        onClick: () => void navigate({ to: "/event/create" }),
      },
      {
        label: "로그아웃",
        icon: <LogOut />,
        variant: "outline",
      },
    ],
  };
  return (
    <PageLayout config={config}>
      <header
        className={`
          flex min-h-screen flex-1 flex-col items-center justify-center
          bg-[#282c34] text-[calc(10px+2vmin)] text-white
        `}
      >
        <PassuLogo />
        <p className="mb-4">Welcome to Passu Admin!</p>
        <Button>Button</Button>
      </header>
    </PageLayout>
  );
}
