import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createFileRoute("/callback")({
  component: Callback,
});

function Callback() {
  const navigate = useNavigate();
  const token =
    new URLSearchParams(window.location.search).get("accessToken") ?? "";

  useEffect(() => {
    if (token) {
      localStorage.setItem("accessToken", token);
      void navigate({ to: "/" });
    } else {
      void navigate({ to: "/login" });
    }
  }, []);
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      Loading...
    </div>
  );
}
