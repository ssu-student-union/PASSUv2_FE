import type { Event } from "@/types/event";

interface EventRowProps {
  event: Event;
  textColor: string;
}

export const EventRow = ({ event, textColor }: EventRowProps) => {
  return (
    <div
      className={`
        flex w-full justify-between border-b-1 border-gray-400 px-4 py-3
        txt-subtitle1
        ${textColor}
      `}
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
