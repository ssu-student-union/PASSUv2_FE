import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "@passu/ui/button";
import { Header } from "@/components/Header";
import { useEventDetail } from "@/api/event";
import partyPopperSvg from "@/assets/party-popper.svg";
import { useUserInfo } from "@/api/user";
import {
  eventDetailSuccessHandler,
  studentInfoSuccessHandler,
  notLoggedInStudentInfoHandler,
} from "@/mocks/storybook-handlers";

interface EventEnrolledPageProps {
  eventId: string;
}

function EventEnrolledPage({ eventId }: EventEnrolledPageProps) {
  const { data: eventData, isLoading: isEventLoading } =
    useEventDetail(eventId);
  const { data: userInfo, isLoading: isUserLoading } = useUserInfo();

  const handleSurveyClick = () => {
    alert("설문조사 참여하기 - 실제로는 설문 페이지로 이동합니다");
  };

  if (isEventLoading || isUserLoading) {
    return (
      <div className="flex size-full flex-col">
        <Header />
        <div className="flex grow items-center justify-center">
          <p className="text-gray-600">정보를 불러오는 중...</p>
        </div>
      </div>
    );
  }

  const event = eventData?.result ? eventData.data : undefined;
  const user = userInfo?.result ? userInfo.data : undefined;

  return (
    <div className="flex size-full flex-col">
      <Header />
      <div className="flex grow flex-col items-center justify-center gap-7">
        <img
          alt="Party popper emoji"
          className="size-32"
          src={partyPopperSvg}
        />
        <div className="text-center">
          <p className="text-2xl text-gray-800">
            {event?.name
              ? `${event.name} 등록이 완료되었습니다!`
              : "등록이 완료되었습니다!"}
          </p>
          {user && (
            <p className="mt-4 text-base text-gray-600">
              {user.name}님, 상품을 수령해주세요!
            </p>
          )}
        </div>
      </div>
      <Button size="footer" onClick={handleSurveyClick}>
        설문조사 참여하기
      </Button>
    </div>
  );
}

const meta: Meta<typeof EventEnrolledPage> = {
  title: "Pages/등록 완료",
  component: EventEnrolledPage,
  parameters: {
    layout: "fullscreen",
  },
  args: {
    eventId: "1",
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Success: Story = {
  name: "성공 - 등록 완료 (로그인 사용자)",
  args: {
    eventId: "1",
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

export const SuccessNoUser: Story = {
  name: "성공 - 등록 완료 (비로그인)",
  args: {
    eventId: "1",
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
