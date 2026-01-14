import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "@passu/ui/button";
import { Header } from "@/components/Header";
import { Chip } from "@passu/ui/chip";
import { Divider } from "@passu/ui/divider";
import { useEventDetail, useEnrolledCount } from "@/api/event";
import { EventRequireStatus } from "@/model/api";
import { getRequireStatuses } from "@/utils/requireStatus";
import {
  eventDetailSuccessHandler,
  eventDetailErrorHandler,
  enrolledCountSuccessHandler,
  studentInfoSuccessHandler,
} from "@/mocks/storybook-handlers";

interface EventDetailPageProps {
  eventId: string;
}

function EventDetailPage({ eventId }: EventDetailPageProps) {
  const {
    data: eventData,
    isLoading: isEventLoading,
    error: eventError,
  } = useEventDetail(eventId);

  const { data: enrolledCountData, isLoading: isCountLoading } =
    useEnrolledCount(eventId);

  const handleParticipateClick = () => {
    alert("참여하기 클릭 - 실제로는 등록 페이지로 이동합니다");
  };

  if (isEventLoading) {
    return (
      <div className="flex size-full flex-col">
        <Header />
        <div className="flex grow items-center justify-center">
          <p className="txt-h2 text-gray-800">이벤트 정보를 불러오는 중...</p>
        </div>
      </div>
    );
  }

  if (eventError) {
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
          <p className="mt-2 text-sm text-gray-600">{eventError.message}</p>
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

  const event = eventData.data;
  const enrolledCount = enrolledCountData?.result ? enrolledCountData.data : 0;
  const requiredStatuses = getRequireStatuses(event.require_status);

  return (
    <div className="flex size-full flex-col">
      <Header />
      <div className="flex grow flex-col gap-4 px-6">
        <div className="flex flex-col gap-5">
          <h2 className="txt-h2 text-gray-800">{event.name}</h2>
          <div className="flex flex-wrap gap-2">
            <Chip>
              <span>잔여수량</span>
              <span className="ml-1">
                <span className="font-bold">
                  {isCountLoading ? "..." : enrolledCount}
                </span>
                /{event.product_quantity} 명
              </span>
            </Chip>
            {event.allowed_departments.map((major: string) => (
              <Chip key={major}>{major}</Chip>
            ))}
            {requiredStatuses.map((status: EventRequireStatus) => {
              switch (status) {
                case EventRequireStatus.ATTENDED:
                  return <Chip key="attended">재학생</Chip>;
                case EventRequireStatus.ON_LEAVE:
                  return <Chip key="on_leave">휴학생</Chip>;
                case EventRequireStatus.GRADUATED:
                  return <Chip key="graduated">졸업생</Chip>;
                default:
                  return <Chip key="unknown">알 수 없음</Chip>;
              }
            })}
          </div>
          <Divider />
        </div>
        <p className="grow overflow-y-auto txt-body1 text-gray-800">
          {event.description}
        </p>
      </div>
      <Button size="footer" onClick={handleParticipateClick}>
        참여하기
      </Button>
    </div>
  );
}

const meta: Meta<typeof EventDetailPage> = {
  title: "Pages/이벤트 상세",
  component: EventDetailPage,
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
  name: "성공 - 이벤트 상세 표시",
  args: {
    eventId: "1",
  },
  parameters: {
    msw: {
      handlers: {
        eventDetail: eventDetailSuccessHandler,
        enrolledCount: enrolledCountSuccessHandler,
        studentInfo: studentInfoSuccessHandler,
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
