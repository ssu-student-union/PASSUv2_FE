import { EventRow } from "@/components/home/EventRow";
import { NoEventRow } from "@/components/home/NoEventRow";
import type { FinishedEventSection } from "@/types/event.api";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@passu/ui/accordion";
import { Link } from "@tanstack/react-router";

interface EventAccordionsProps {
  sections: FinishedEventSection[];
}

export const EventAccordions = ({ sections }: EventAccordionsProps) => {
  return (
    <Accordion type="multiple" className="flex w-full flex-col gap-12">
      {sections.map((section) => (
        <AccordionItem
          key={section.organizationName}
          value={section.organizationName}
          className="border-none"
        >
          <AccordionTrigger className="cursor-pointer">
            {section.organizationName}
          </AccordionTrigger>

          <AccordionContent className="mt-1 max-h-90 overflow-auto px-2">
            {section.events.length === 0 ? (
              <NoEventRow />
            ) : (
              section.events.map((event) => (
                <Link
                  key={event.id}
                  to="/event/$id/result"
                  params={{ id: String(event.id) }}
                >
                  <EventRow event={event} className="text-gray-600" />
                </Link>
              ))
            )}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};
