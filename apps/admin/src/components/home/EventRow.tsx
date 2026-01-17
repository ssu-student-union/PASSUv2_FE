import type { EventData } from "@/types/event.api";
import { cn } from "@passu/ui/utils";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

interface EventRowProps {
  event: EventData;
  className: string;
}

export const EventRow = ({ event, className }: EventRowProps) => {
  const startTime = dayjs.utc(event.startTime).tz("Asia/Seoul");

  const formattedDate = startTime.format("YYYY/MM/DD");
  const formattedStartTime = startTime.format("HH:mm");

  return (
    <div
      className={cn(
        `
          flex w-full justify-between overflow-x-auto border-b-1 border-gray-400
          px-4 py-3 txt-subtitle1 whitespace-nowrap
        `,
        className,
      )}
    >
      <span>{event.name}</span>
      <div className="flex gap-4">
        <span> {event.location}</span>
        <span> {formattedDate}</span>
        <span> {formattedStartTime}</span>
      </div>
    </div>
  );
};
