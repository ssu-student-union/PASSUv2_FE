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
    const controls = animate(progressValue, 100, { duration: 1, repeat: 1 }); // Animate to 100% over 1 second
    return () => controls.stop();
  }, []);

  useEffect(() => {
    if (accessToken) {
      // TODO: Set the access token after verification with user-info API requests
      setAccessToken(accessToken);
      // TODO: Add `to` query parameter to redirect URL
      // Redirect to home or a dashboard after setting the token
      // You might want to navigate to a specific page based on your app's logic
      // void redirect({ to: "/" });
    }
  }, [accessToken, setAccessToken]);

  return (
    <div className="flex size-full flex-col items-center justify-center gap-16">
      <div
        className={`
          flex w-60 flex-col items-center justify-center gap-16 pb-[120px]
        `}
      >
        <div className="w-full text-center txt-h2 text-gray-800">
          <p>로그인 중</p>
        </div>
        <div className="flex w-full flex-col gap-2 rounded bg-blue-50">
          <Progress value={progressValue.get()} />
        </div>
      </div>
    </div>
  );
}
