import { createFileRoute, redirect } from "@tanstack/react-router";
import { useSetAtom } from "jotai";
import { accessTokenAtom } from "../../atoms/auth";
import { useEffect } from "react";
import { z } from "zod";
import { zodValidator } from "@tanstack/zod-adapter";

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

  useEffect(() => {
    if (accessToken) {
      setAccessToken(accessToken);
      // Redirect to home or a dashboard after setting the token
      // You might want to navigate to a specific page based on your app's logic
      window.location.href = "/";
    }
  }, [accessToken, setAccessToken]);

  return (
    <div>
      <p>Processing authentication...</p>
    </div>
  );
}
