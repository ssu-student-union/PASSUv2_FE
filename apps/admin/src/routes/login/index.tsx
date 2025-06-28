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
      <a
        className={`
          flex h-19 w-124 cursor-pointer items-center justify-center
          rounded-full border-2 text-2xl font-bold text-hover
          hover:bg-gray-200 hover:text-hover
        `}
        href={`https://stu.ssu.ac.kr/register/redirect?redirect=${baseUrl}/login/callback`}
      >
        관리자 로그인
      </a>
    </div>
  );
}
