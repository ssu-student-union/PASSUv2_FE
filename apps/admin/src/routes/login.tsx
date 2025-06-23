import { Button } from "@passu/ui/button";
import { PassuLogo } from "@passu/ui/passu-logo";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/login")({
  component: Login,
});

function Login() {
  const baseUrl = window.location.origin;
  const handleAdminLogin = () => {
    window.location.href = `https://stu.ssu.ac.kr/register/redirect?redirect=${baseUrl}/callback`;
  };

  return (
    <div
      className={`
        flex h-screen w-screen flex-col items-center justify-center gap-8
      `}
    >
      <PassuLogo className="h-auto w-120" />
      <Button
        className={`
          h-19 w-124 rounded-full border-2 text-2xl font-bold text-hover
          hover:text-hover
        `}
        variant={"outline"}
        onClick={handleAdminLogin}
      >
        관리자 로그인
      </Button>
    </div>
  );
}
