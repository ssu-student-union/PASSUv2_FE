import { Button } from "@passu/ui/button";
import { type ReactNode } from "react";

interface SidebarButtonProps {
  variant?: "default" | "outline";
  onClick?: () => void;
  asChild?: boolean;
  children: ReactNode;
}

export const SidebarButton = ({
  variant = "default",
  onClick,
  asChild,
  children,
}: SidebarButtonProps) => {
  return (
    <Button
      variantType="sidebar"
      variant={variant}
      onClick={onClick}
      asChild={asChild}
    >
      {children}
    </Button>
  );
};
