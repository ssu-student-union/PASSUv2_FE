import { useEffect, useRef, useCallback } from "react";
import { useRouter } from "@tanstack/react-router";

export type NavigationDirection = "forward" | "back";

/**
 * Navigation direction을 감지하여 HTML 요소에 data 속성으로 적용하는 훅
 * View Transition API의 방향별 애니메이션에 사용됩니다.
 */
export function useNavigationDirection() {
  const router = useRouter();
  const historyStackRef = useRef<string[]>([]);
  const isBackNavigationRef = useRef(false);

  // popstate 이벤트로 뒤로가기 감지
  useEffect(() => {
    const handlePopState = () => {
      isBackNavigationRef.current = true;
      document.documentElement.dataset.navDirection = "back";
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  // 라우터 상태 변경 감지
  useEffect(() => {
    const currentPath = router.state.location.pathname;

    // 뒤로가기가 아닌 경우 (앞으로 네비게이션)
    if (!isBackNavigationRef.current) {
      document.documentElement.dataset.navDirection = "forward";
      historyStackRef.current.push(currentPath);
    } else {
      // 뒤로가기 후 스택에서 제거
      historyStackRef.current.pop();
    }

    // 플래그 리셋
    isBackNavigationRef.current = false;

    // 트랜지션 완료 후 속성 제거 (다음 트랜지션을 위해)
    const cleanup = setTimeout(() => {
      delete document.documentElement.dataset.navDirection;
    }, 350); // 트랜지션 시간보다 약간 길게

    return () => clearTimeout(cleanup);
  }, [router.state.location.pathname]);

  const getDirection = useCallback((): NavigationDirection => {
    return isBackNavigationRef.current ? "back" : "forward";
  }, []);

  return { getDirection };
}
