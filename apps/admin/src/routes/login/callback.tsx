import {
  createFileRoute,
  useNavigate,
  useSearch,
} from "@tanstack/react-router";
import { useEffect } from "react";
import { z } from "zod";

export const Route = createFileRoute("/login/callback")({
  validateSearch: z.object({
    accessToken: z.string(),
  }),
  component: Callback,
});

function Callback() {
  const navigate = useNavigate();
  const { accessToken } = useSearch({ from: Route.id });

  useEffect(() => {
    if (accessToken) {
      localStorage.setItem("accessToken", accessToken);
      void navigate({ to: "/" });
    } else {
      void navigate({ to: "/login" });
    }
  }, [accessToken, navigate]);
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      Loading...
    </div>
  );
}
