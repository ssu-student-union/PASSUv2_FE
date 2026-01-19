import type { ComponentProps } from "react";
import { Link } from "@tanstack/react-router";
import { PassuLogo } from "@passu/ui/passu-logo";
import { cn } from "@passu/ui/utils";
import { useUserInfo } from "@/api/user";

type HeaderProps = ComponentProps<"div">;

export const Header = ({ className, ...props }: HeaderProps) => {
  const { data: userInfo } = useUserInfo({
    queryOptions: {
      throwOnError: false,
    },
  });
  const name = userInfo?.result ? userInfo.data.name : null;

  return (
    <div
      className={cn("flex w-full shrink-0 items-center px-6 py-4", className)}
      {...props}
    >
      <Link to="/" className="grow">
        <PassuLogo className="h-9" />
      </Link>
      {name && (
        <div>
          <strong>{name}</strong> 님
        </div>
      )}
    </div>
  );
};
