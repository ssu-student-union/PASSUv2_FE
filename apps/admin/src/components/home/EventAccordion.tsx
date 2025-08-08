import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@passu/ui/accordion";
import { EventRow } from "@/components/home/EventRow";
import { NoEventRow } from "@/components/home/NoEventRow";
import { type Event } from "@/types/event";
import { Link } from "@tanstack/react-router";

interface EventAccordionProps {
  variant: "upcoming" | "completed";
  events: Event[];
}

export const EventAccordion = ({ variant, events }: EventAccordionProps) => {
  const title = variant === "upcoming" ? "예정된 행사" : "완료된 행사";
  const textColor: string =
    variant === "upcoming" ? "text-gray-900" : "text-gray-600";

  return (
    <Accordion type="multiple" className="w-full">
      <AccordionItem value={variant}>
        <AccordionTrigger className="cursor-pointer">{title}</AccordionTrigger>
        <AccordionContent className="mt-1 px-2">
          {events.length === 0 ? (
            <NoEventRow />
          ) : (
            events.map((item) => (
              <Link
                to={
                  variant === "upcoming"
                    ? "/event/$id/progress"
                    : "/event/$id/result"
                }
                params={{ id: String(item.id) }}
                key={item.id}
              >
                <EventRow event={item} className={textColor} />
              </Link>
            ))
          )}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};
