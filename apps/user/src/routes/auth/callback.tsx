import { createFileRoute, redirect, useNavigate } from "@tanstack/react-router";
import { useSetAtom } from "jotai";
import { accessTokenAtom } from "@/atoms/auth";
import { useEffect, useState } from "react";
import { useMotionValue, animate } from "motion/react";
import { z } from "zod";
import { zodValidator } from "@tanstack/zod-adapter";
import { Progress } from "@passu/ui/progress";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalTitle,
  ModalDescription,
  ModalFooter,
} from "@passu/ui/modal";
import { Button } from "@passu/ui/button";
import { useUserInfo } from "@/api/user";

const authCallbackSearchSchema = z.object({
  accessToken: z.string(),
  to: z.string().optional(),
});

export const Route = createFileRoute("/auth/callback")({
  component: AuthCallback,
  validateSearch: zodValidator(authCallbackSearchSchema),
  beforeLoad: ({ search }) => {
    const parsedSearch = authCallbackSearchSchema.safeParse(search);
    if (!parsedSearch.success || !parsedSearch.data.accessToken) {
      // eslint-disable-next-line @typescript-eslint/only-throw-error
      throw redirect({ to: "/" });
    }
  },
});

function AuthCallback() {
  const { accessToken, to } = Route.useSearch();
  const setAccessToken = useSetAtom(accessTokenAtom);
  const navigate = useNavigate();
  const [showErrorModal, setShowErrorModal] = useState(false);
  const progressValue = useMotionValue(0);

  // 사용자 정보 조회 쿼리 (토큰 검증용)
  const { data, isError, isSuccess } = useUserInfo({
    accessToken,
    queryOptions: {
      enabled: !!accessToken,
      retry: false, // 실패 시 재시도하지 않음
    },
  });

  useEffect(() => {
    const controls = animate(progressValue, 100, {
      duration: 1,
      repeat: Infinity,
    });
    return () => controls.stop();
  }, [progressValue]);

  useEffect(() => {
    if (isSuccess && data) {
      // 토큰 검증 성공 - 토큰 저장 후 리다이렉트
      setAccessToken(accessToken);
      void navigate({ to: to ?? "/" });
    } else if (isError || !(data && "data" in data)) {
      // 토큰 검증 실패 - 에러 모달 표시
      setShowErrorModal(true);
    }
  }, [data, isError, isSuccess, accessToken, setAccessToken, navigate, to]);

  const handleErrorModalClose = () => {
    setShowErrorModal(false);
    // void navigate({ to: "/" });
  };

  return (
    <>
      <div
        className={`flex size-full flex-col items-center justify-center gap-16`}
      >
        <div
          className={`
            flex w-60 flex-col items-center justify-center gap-16 pb-[120px]
          `}
        >
          <div className="w-full text-center txt-h2 text-gray-800">
            <p>로그인 중</p>
          </div>
          <div className="flex w-full flex-col gap-2 rounded bg-blue-50">
            <Progress value={progressValue.get()} />
          </div>
        </div>
      </div>

      <Modal open={showErrorModal} onOpenChange={setShowErrorModal}>
        <ModalContent>
          <ModalHeader>
            <ModalTitle>로그인 실패</ModalTitle>
            <ModalDescription>
              올바르지 않은 사용자 정보입니다. 다시 로그인해 주세요.
            </ModalDescription>
          </ModalHeader>
          <ModalFooter>
            <Button onClick={handleErrorModalClose}>확인</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
