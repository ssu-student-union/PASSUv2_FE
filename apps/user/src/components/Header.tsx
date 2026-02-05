import type { ComponentProps } from "react";
import { Link } from "@tanstack/react-router";
import { PassuLogo } from "@passu/ui/passu-logo";
import { cn } from "@passu/ui/utils";
import { AuthMenu } from "./AuthMenu";

type HeaderProps = ComponentProps<"header">;

export const Header = ({ className, ...props }: HeaderProps) => {
  return (
    <header
      className={cn("flex w-full shrink-0 items-center px-6 py-4", className)}
      style={{ viewTransitionName: "header" }}
      {...props}
    >
      <div className="grow">
        <Link to="/" aria-label="PASSU 홈으로 이동">
          <PassuLogo className="h-9" />
        </Link>
      </div>
      <AuthMenu />
    </header>
  );
};
