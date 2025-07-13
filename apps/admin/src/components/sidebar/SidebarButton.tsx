import { Button } from "@passu/ui/button";
import { type ReactNode } from "react";

interface SidebarButtonProps {
  variant?: "default" | "outline";
  onClick?: () => void;
  asChild?: boolean;
  children: ReactNode;
}

export default function SidebarButton({
  variant = "default",
  onClick,
  asChild,
  children,
}: SidebarButtonProps) {
  const outlineClass =
    variant === "outline" ? "border-2 text-primary hover:text-primary" : "";

  return (
    <Button
      size="sidebar"
      variant={variant}
      onClick={onClick}
      asChild={asChild}
      className={outlineClass}
    >
      {children}
    </Button>
  );
}
