import type { Meta, StoryObj } from "@storybook/react-vite";
import { useMemo } from "react";
import { useEventList } from "@/api/event";
import { EventCard } from "@/components/EventCard";
import type { EventInfoData } from "@/model/api";
import { Skeleton } from "@passu/ui/skeleton";
import { Separator } from "@passu/ui/separator";
import { Header } from "@/components/Header";
import { isToday, formatDate } from "@/utils/date";
import {
  eventListSuccessHandler,
  eventListErrorHandler,
  emptyEventListHandler,
  studentInfoSuccessHandler,
  notLoggedInStudentInfoHandler,
} from "@/mocks/storybook-handlers";

function filterTodayEvents(events: EventInfoData[]): EventInfoData[] {
  return events.filter((event) => isToday(event.start_time));
}

function EventCardSkeleton() {
  return (
    <div
      className={`
        flex flex-col items-start gap-3 rounded-xl bg-white p-4 shadow-sm
        sm:gap-4 sm:p-5
      `}
    >
      <Skeleton className="h-7 w-16 rounded-full" />
      <div
        className={`
          flex w-full flex-col items-center gap-1
          sm:gap-1.5
        `}
      >
        <Skeleton className="h-4 w-16" />
        <Skeleton className="h-5 w-40" />
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-3 w-20" />
        <Skeleton
          className={`
            mt-1 h-4 w-36
            sm:mt-2
          `}
        />
      </div>
    </div>
  );
}

function EventListPage() {
  const { data, isLoading, isError, error } = useEventList();

  const todayEvents = useMemo(
    () => (data?.result && data.data ? filterTodayEvents(data.data) : []),
    [data],
  );

  const todayDate = formatDate();

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <div
        className={`
          flex items-center justify-between px-4 py-4
          sm:px-6 sm:py-5
        `}
      >
        <span
          className={`
            text-lg font-semibold text-gray-900
            sm:text-xl
          `}
        >
          {todayDate}
        </span>
        <h1
          className={`
            text-lg font-bold text-gray-900
            sm:text-xl
          `}
        >
          오늘의 행사
        </h1>
      </div>
      <Separator />
      <main
        className={`
          flex flex-1 flex-col gap-4 px-4 py-4
          sm:gap-5 sm:px-6
        `}
      >
        {isLoading && (
          <>
            <EventCardSkeleton />
            <EventCardSkeleton />
            <EventCardSkeleton />
          </>
        )}

        {isError && (
          <div className="rounded-xl bg-white p-6 text-center">
            <p className="text-red-500">
              오류가 발생했습니다: {error?.message}
            </p>
          </div>
        )}

        {!isLoading && !isError && todayEvents.length === 0 && (
          <div className="rounded-xl bg-white p-6 text-center">
            <p className="text-gray-500">오늘 예정된 행사가 없습니다.</p>
          </div>
        )}

        {!isLoading &&
          !isError &&
          todayEvents.map((event) => (
            <div
              key={event.id}
              className={`
                block transition-transform
                active:scale-[0.98]
              `}
            >
              <EventCard event={event} />
            </div>
          ))}
      </main>
    </div>
  );
}

const meta: Meta<typeof EventListPage> = {
  title: "Pages/이벤트 목록",
  component: EventListPage,
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Success: Story = {
  name: "성공 - 이벤트 목록 표시",
  parameters: {
    msw: {
      handlers: {
        eventList: eventListSuccessHandler,
        studentInfo: studentInfoSuccessHandler,
      },
    },
  },
};

export const SuccessLoggedIn: Story = {
  name: "성공 - 로그인한 사용자",
  parameters: {
    msw: {
      handlers: {
        eventList: eventListSuccessHandler,
        studentInfo: studentInfoSuccessHandler,
      },
    },
  },
};

export const SuccessNotLoggedIn: Story = {
  name: "성공 - 비로그인 사용자",
  parameters: {
    msw: {
      handlers: {
        eventList: eventListSuccessHandler,
        studentInfo: notLoggedInStudentInfoHandler,
      },
    },
  },
};

export const Empty: Story = {
  name: "성공 - 오늘 행사 없음",
  parameters: {
    msw: {
      handlers: {
        eventList: emptyEventListHandler,
        studentInfo: studentInfoSuccessHandler,
      },
    },
  },
};

export const Error: Story = {
  name: "실패 - 서버 오류",
  parameters: {
    msw: {
      handlers: {
        eventList: eventListErrorHandler,
        studentInfo: studentInfoSuccessHandler,
      },
    },
  },
};
