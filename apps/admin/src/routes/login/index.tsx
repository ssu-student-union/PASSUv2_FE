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
        flex h-screen w-screen flex-col items-center justify-center gap-6 px-6
        sm:gap-8 sm:px-10
      `}
    >
      <PassuLogo
        className={`
          h-auto w-48
          sm:w-60
          md:w-80
          lg:w-96
        `}
      />
      <Button
        asChild
        className={`
          h-14 w-full max-w-xs rounded-full border-2 !border-primary !bg-white
          text-lg font-bold text-hover
          hover:text-hover
          sm:h-16 sm:max-w-md sm:text-xl
          md:h-18 md:max-w-lg md:text-2xl
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
