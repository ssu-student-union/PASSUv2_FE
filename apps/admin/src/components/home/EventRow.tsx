import type { Event } from "@/types/event";
import { cn } from "@passu/ui/utils";

interface EventRowProps {
  event: Event;
  className: string;
}

export const EventRow = ({ event, className }: EventRowProps) => {
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
        <span> {event.place}</span>
        <span> {event.date}</span>
        <span> {event.time}</span>
      </div>
    </div>
  );
};
