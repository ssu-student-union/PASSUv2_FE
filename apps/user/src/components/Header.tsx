import type { ComponentProps } from "react";
import { Link } from "@tanstack/react-router";
import { PassuLogo } from "@passu/ui/passu-logo";
import { cn } from "@passu/ui/utils";
import { useUserInfo } from "@/api/user";

type HeaderProps = ComponentProps<"header">;

export const Header = ({ className, ...props }: HeaderProps) => {
  const { data: userInfo } = useUserInfo({
    queryOptions: {
      throwOnError: false,
    },
  });
  const name = userInfo?.result ? userInfo.data.name : null;

  return (
    <header
      className={cn("flex w-full shrink-0 items-center px-6 py-4", className)}
      style={{ viewTransitionName: "header" }}
      {...props}
    >
      <Link to="/" className="grow" aria-label="PASSU 홈으로 이동">
        <PassuLogo className="h-9" />
      </Link>
      {name && (
        <div>
          <strong>{name}</strong> 님
        </div>
      )}
    </header>
  );
};
