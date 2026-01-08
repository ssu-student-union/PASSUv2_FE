import { createFileRoute, Link } from "@tanstack/react-router";
import { useEventList } from "@/api/event";
import { EventCard } from "@/components/EventCard";
import type { EventInfoData } from "@/model/api";
import { Skeleton } from "@passu/ui/skeleton";
import { Separator } from "@passu/ui/separator";
import { Header } from "@/components/Header";
import { formatEventDate } from "@/utils/date";

export const Route = createFileRoute("/")({
  component: App,
});

function isSameDay(date1: Date, date2: Date): boolean {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
}

function filterTodayEvents(events: EventInfoData[]): EventInfoData[] {
  const today = new Date();
  return events.filter((event) => {
    const eventDate = new Date(event.start_time);
    return isSameDay(eventDate, today);
  });
}

function formatTodayDate(): string {
  return formatEventDate(new Date().toISOString()).split(" ")[0];
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

function App() {
  const { data, isLoading, isError, error } = useEventList();

  const todayEvents =
    data?.result && data.data ? filterTodayEvents(data.data) : [];

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
          {formatTodayDate()}
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
            <Link
              key={event.id}
              to="/event/$id"
              params={{ id: String(event.id) }}
              className={`
                block transition-transform
                active:scale-[0.98]
              `}
            >
              <EventCard event={event} />
            </Link>
          ))}
      </main>
    </div>
  );
}
