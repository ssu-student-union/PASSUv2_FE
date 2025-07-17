import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@passu/ui/accordion";

interface Event {
  name: string;
  place: string;
  date: string;
  time: string;
}

interface EventAccordionProps {
  title: string;
  events: Event[];
  textColor?: string;
}

export const EventAccordion = ({
  title,
  events,
  textColor,
}: EventAccordionProps) => {
  return (
    <Accordion type="multiple" className="w-full">
      <AccordionItem value="upcoming">
        <AccordionTrigger className={"px-6 py-3 txt-h3 text-gray-900"}>
          {title}
        </AccordionTrigger>
        <AccordionContent className="mt-1 px-2">
          {events.length === 0 ? (
            <div
              className={`
                flex w-full justify-between border-b-1 border-gray-400 px-4 py-3
                txt-subtitle1 text-gray-600
              `}
            >
              <span>행사가 존재하지 않습니다.</span>
            </div>
          ) : (
            events.map((item, idx) => (
              <div
                key={idx}
                className={`
                  flex w-full justify-between border-b-1 border-gray-400 px-4
                  py-3 txt-subtitle1
                  ${textColor}
                `}
              >
                <span>{item.name}</span>
                <div className="flex gap-4">
                  <span> {item.place}</span>
                  <span> {item.date}</span>
                  <span> {item.time}</span>
                </div>
              </div>
            ))
          )}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};
