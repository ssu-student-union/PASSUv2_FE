import { createFileRoute, redirect } from "@tanstack/react-router";
import { useSetAtom } from "jotai";
import { accessTokenAtom } from "../../atoms/auth";
import { useEffect } from "react";
import { useMotionValue, animate } from "motion/react";
import { z } from "zod";
import { zodValidator } from "@tanstack/zod-adapter";
import { Progress } from "@passu/ui/progress";

const authCallbackSearchSchema = z.object({
  accessToken: z.string(),
});

export const Route = createFileRoute("/auth/callback")({
  component: AuthCallback,
  validateSearch: zodValidator(authCallbackSearchSchema),
  beforeLoad: ({ search }) => {
    const parsedSearch = authCallbackSearchSchema.safeParse(search);
    if (!parsedSearch.success || !parsedSearch.data.accessToken) {
      // eslint-disable-next-line @typescript-eslint/only-throw-error
      throw redirect({ to: "/" });
    }
  },
});

function AuthCallback() {
  const { accessToken } = Route.useSearch();
  const setAccessToken = useSetAtom(accessTokenAtom);
  const progressValue = useMotionValue(0);

  useEffect(() => {
    const controls = animate(progressValue, 100, { duration: 1 }); // Animate to 100% over 1 second
    return () => controls.stop();
  });

  useEffect(() => {
    if (accessToken) {
      // TODO: Set the access token after verification with user-info API requests
      setAccessToken(accessToken);
      // TODO: Add `to` query parameter to redirect URL
      // Redirect to home or a dashboard after setting the token
      // You might want to navigate to a specific page based on your app's logic
      window.location.href = "/";
    }
  }, [accessToken, setAccessToken]);

  return (
    <div
      className={`
        relative box-border flex size-full flex-col content-stretch items-center
        justify-center gap-16 p-0
      `}
      data-name="View"
      id="node-1267_1455"
    >
      <div
        className={`
          relative box-border flex w-60 shrink-0 flex-col content-stretch
          items-center justify-center gap-16 px-0 pt-0 pb-[120px]
        `}
        data-name="Login"
        id="node-1267_1456"
      >
        <div
          className={`
            relative w-full shrink-0 text-center text-[24px] leading-[0]
            text-[rgba(0,0,0,0.8)] not-italic
            font-['Pretendard:Regular',_sans-serif]
          `}
          id="node-1252_723"
        >
          <p className="block leading-[normal]">로그인 중</p>
        </div>
        <div
          className={`
            relative box-border flex w-full shrink-0 flex-col content-stretch
            items-start justify-start gap-2 rounded bg-[#e2f2ff] p-0
          `}
          data-name="Load"
          id="node-1252_724"
        >
          <Progress value={progressValue.get()} />
        </div>
      </div>
    </div>
  );
}
