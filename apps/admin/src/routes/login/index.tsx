import { Button } from "@passu/ui/button";
import { PassuLogo } from "@passu/ui/passu-logo";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/login/")({
  component: Login,
});

function Login() {
  const baseUrl = window.location.origin;

  return (
    <div
      className={`
        flex h-screen w-screen flex-col items-center justify-center gap-8
      `}
    >
      <PassuLogo className="h-auto w-120" />
      <Button
        asChild
        className={`
          h-19 w-124 rounded-full border-2 !border-primary !bg-white text-2xl
          font-bold text-hover
          hover:text-hover
        `}
        variant={"outline"}
      >
        <a
          href={`http://stu.ssu.ac.kr/register/redirect?redirect=${baseUrl}/login/callback`}
        >
          관리자 로그인
        </a>
      </Button>
    </div>
  );
}
