import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "@passu/ui/button";
import { Header } from "@/components/Header";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalTitle,
  ModalDescription,
  ModalFooter,
} from "@passu/ui/modal";
import { useState } from "react";
import { useEventDetail } from "@/api/event";
import {
  eventDetailSuccessHandler,
  eventDetailErrorHandler,
  studentInfoSuccessHandler,
  notLoggedInStudentInfoHandler,
} from "@/mocks/storybook-handlers";

interface EventIdPageProps {
  eventId: string;
  isLoggedIn?: boolean;
}

function EventIdPage({ eventId, isLoggedIn = false }: EventIdPageProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: eventData, isLoading, error } = useEventDetail(eventId);

  const handleParticipateClick = () => {
    if (!isLoggedIn) {
      setIsModalOpen(true);
    } else {
      alert("참여하기 클릭 - 실제로는 상세 페이지로 이동합니다");
    }
  };

  const handleLoginRedirect = () => {
    alert("로그인 페이지로 이동합니다");
  };

  if (isLoading) {
    return (
      <div className="flex size-full flex-col">
        <Header />
        <div className="flex grow items-center justify-center">
          <p className="txt-h2 text-gray-800">이벤트 정보를 불러오는 중...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex size-full flex-col">
        <Header />
        <div
          className={`
            flex grow flex-col items-center justify-center text-center
          `}
        >
          <p className="txt-h2 text-gray-800">
            이벤트를 불러오는 중 오류가 발생했습니다.
          </p>
          <p className="mt-2 text-sm text-gray-600">{error.message}</p>
        </div>
        <Button size="footer" onClick={() => alert("홈으로 이동")}>
          홈으로 돌아가기
        </Button>
      </div>
    );
  }

  if (!eventData?.result) {
    return (
      <div className="flex size-full flex-col">
        <Header />
        <div
          className={`
            flex grow flex-col items-center justify-center text-center
          `}
        >
          <p className="txt-h2 text-gray-800">이벤트를 찾을 수 없습니다.</p>
        </div>
        <Button size="footer" onClick={() => alert("홈으로 이동")}>
          홈으로 돌아가기
        </Button>
      </div>
    );
  }

  return (
    <>
      <div className="flex size-full flex-col">
        <Header />
        <div className="flex grow flex-col items-center justify-center gap-8">
          <h2 className="txt-h2 text-gray-800">{eventData.data.name}</h2>
          {eventData.data.description && (
            <p className="max-w-md truncate text-center text-base text-gray-600">
              {eventData.data.description}
            </p>
          )}
        </div>
        <Button size="footer" onClick={handleParticipateClick}>
          참여하기
        </Button>
      </div>

      <Modal open={isModalOpen} onOpenChange={setIsModalOpen}>
        <ModalContent>
          <ModalHeader>
            <ModalTitle>로그인 필요</ModalTitle>
            <ModalDescription>
              이벤트에 참여하려면 로그인이 필요합니다.
            </ModalDescription>
          </ModalHeader>
          <ModalFooter>
            <Button variant="outline" onClick={() => setIsModalOpen(false)}>
              취소
            </Button>
            <Button onClick={handleLoginRedirect}>로그인</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

const meta: Meta<typeof EventIdPage> = {
  title: "Pages/이벤트 진입",
  component: EventIdPage,
  parameters: {
    layout: "fullscreen",
  },
  args: {
    eventId: "1",
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const SuccessLoggedIn: Story = {
  name: "성공 - 로그인 상태",
  args: {
    eventId: "1",
    isLoggedIn: true,
  },
  parameters: {
    msw: {
      handlers: {
        eventDetail: eventDetailSuccessHandler,
        studentInfo: studentInfoSuccessHandler,
      },
    },
  },
};

export const SuccessNotLoggedIn: Story = {
  name: "성공 - 비로그인 상태",
  args: {
    eventId: "1",
    isLoggedIn: false,
  },
  parameters: {
    msw: {
      handlers: {
        eventDetail: eventDetailSuccessHandler,
        studentInfo: notLoggedInStudentInfoHandler,
      },
    },
  },
};

export const Error: Story = {
  name: "실패 - 이벤트 조회 실패",
  args: {
    eventId: "999",
  },
  parameters: {
    msw: {
      handlers: {
        eventDetail: eventDetailErrorHandler,
        studentInfo: studentInfoSuccessHandler,
      },
    },
  },
};
