import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@passu/ui/accordion";
import { EventRow } from "./EventRow";
import { NoEventRow } from "./NoEventRow";
import { type Event } from "@/types/event";

interface EventAccordionProps {
  variant: "upcoming" | "completed";
  events: Event[];
}

export const EventAccordion = ({ variant, events }: EventAccordionProps) => {
  const title = variant === "upcoming" ? "예정된 행사" : "완료된 행사";
  const textColor = variant === "upcoming" ? "text-gray-900" : "text-gray-600";

  return (
    <Accordion type="multiple" className="w-full">
      <AccordionItem value={variant}>
        <AccordionTrigger className="px-6 py-3 txt-h3 text-gray-900">
          {title}
        </AccordionTrigger>
        <AccordionContent className="mt-1 px-2">
          {events.length === 0 ? (
            <NoEventRow />
          ) : (
            events.map((item) => (
              <EventRow event={item} textColor={textColor} key={item.id} />
            ))
          )}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};
