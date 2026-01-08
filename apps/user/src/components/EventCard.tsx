import { cn } from "@passu/ui/utils";
import { Chip } from "@passu/ui/chip";
import type { EventInfoData, EventStatus } from "../model/api";
import { formatEventDate } from "@/utils/date";

interface EventCardProps {
  className?: string;
  event: EventInfoData;
}

const statusConfig: Record<
  EventStatus,
  {
    label: string;
    variant: "default" | "secondary" | "destructive" | "outline";
  }
> = {
  BEFORE: { label: "행사 예정", variant: "outline" },
  ONGOING: { label: "행사 중", variant: "default" },
  PAUSE: { label: "일시 정지", variant: "secondary" },
  AFTER: { label: "행사 종료", variant: "destructive" },
};

export function EventCard({ className, event }: EventCardProps) {
  const { label, variant } = statusConfig[event.status] ?? statusConfig.BEFORE;

  return (
    <div
      className={cn(
        "flex flex-col items-start gap-3 rounded-xl bg-white p-4",
        `
          shadow-sm transition-shadow
          hover:shadow-md
        `,
        "sm:gap-4 sm:p-5",
        className,
      )}
    >
      {/* Status Badge */}
      <Chip
        variant={variant}
        className={cn(
          "px-3 py-1 text-xs font-semibold",
          variant === "default" && "bg-blue-800 text-white",
          "sm:px-4 sm:py-1.5 sm:text-sm",
        )}
      >
        {label}
      </Chip>
      <div
        className={`
          flex w-full flex-col items-center gap-1 text-center
          sm:gap-1.5
        `}
      >
        <span
          className={`
            text-xs text-gray-600
            sm:text-sm
          `}
        >
          {/* TODO: Show organizer name when available */}
          총학생회
        </span>

        {/* Event Name */}
        <h3
          className={`
            text-base font-bold text-gray-900
            sm:text-lg
          `}
        >
          {event.name}
        </h3>

        {/* Product Name */}
        <span
          className={`
            text-sm text-gray-700
            sm:text-base
          `}
        >
          {event.product_name}
        </span>

        {/* Product Count */}
        <span
          className={`
            text-xs text-gray-500
            sm:text-sm
          `}
        >
          ({event.product_enrolled_count} / {event.product_quantity})
        </span>

        {/* Start Time */}
        <span
          className={`
            mt-1 text-xs font-medium text-gray-800
            sm:mt-2 sm:text-sm
          `}
        >
          {formatEventDate(event.start_time)}
        </span>
      </div>
    </div>
  );
}
