import { redirect } from "@tanstack/react-router";

export function authGuard() {
  const token = localStorage.getItem("accessToken");
  if (!token) {
    redirect({ to: "/login", throw: true });
  }
}
