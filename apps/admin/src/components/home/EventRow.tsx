import type { EventData } from "@/types/event.api";
import { cn } from "@passu/ui/utils";
import dayjs from "dayjs";

interface EventRowProps {
  event: EventData;
  className: string;
}

export const EventRow = ({ event, className }: EventRowProps) => {
  const startTime = dayjs(event.startTime);

  const formattedDate = startTime.format("YYYY/MM/DD");
  const formattedStartTime = startTime.format("HH:mm");

  return (
    <div
      className={cn(
        `
          flex w-full justify-between border-b-1 border-gray-400 px-4 py-3
          txt-subtitle1
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
