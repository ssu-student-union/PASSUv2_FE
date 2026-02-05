import { useAtom } from "jotai";
import { Button } from "@passu/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@passu/ui/dropdown-menu";
import { accessTokenAtom } from "@/atoms/auth";
import { useUserInfo } from "@/api/user";

export const AuthMenu = () => {
  const [accessToken, setAccessToken] = useAtom(accessTokenAtom);
  const { data: userInfo } = useUserInfo();

  const isLoggedIn = !!accessToken && userInfo?.result;
  const userData = userInfo?.result ? userInfo.data : null;

  const getLoginUrl = () => {
    const redirectUrl = `${window.location.origin}/auth/callback?to=${window.location.pathname}`;
    const encodedRedirectUrl = encodeURIComponent(redirectUrl);
    return `https://stu.ssu.ac.kr/register/redirect?redirect=${encodedRedirectUrl}`;
  };

  const handleLogout = () => {
    setAccessToken(null);
  };

  if (!isLoggedIn) {
    return (
      <Button variant="default" size="sm" asChild>
        <a href={getLoginUrl()}>로그인</a>
      </Button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="gap-1">
          <span className="font-semibold">{userData?.name}</span>
          <span>님</span>
          <svg
            className="size-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-48">
        {/* 사용자 정보 */}
        <DropdownMenuLabel className="flex flex-col gap-0.5 font-normal">
          <span className="text-sm font-semibold text-foreground">
            {userData?.name}
          </span>
          <span className="text-xs text-muted-foreground">
            {userData?.major}
          </span>
          <span className="text-xs text-muted-foreground">
            {userData?.studentId}
          </span>
          {userData?.isPaidUnionFee && (
            <span
              className={`
                mt-1 inline-block w-fit rounded-full bg-primary/10 px-2 py-0.5
                text-xs text-primary
              `}
            >
              학생회비 납부
            </span>
          )}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {/* 로그아웃 버튼 */}
        <DropdownMenuItem onClick={handleLogout}>로그아웃</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
