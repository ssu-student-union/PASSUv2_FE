import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@passu/ui/accordion";
import { EventRow } from "@/components/home/EventRow";
import { NoEventRow } from "@/components/home/NoEventRow";
import { Link } from "@tanstack/react-router";
import { useInfiniteEventList } from "@/api/event";
import { useEffect, useRef, useState } from "react";
import { EventStatus } from "@/types/event";

interface EventAccordionProps {
  type: EventStatus;
}

export const EventAccordion = ({ type }: EventAccordionProps) => {
  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const [openItems, setOpenItems] = useState<string[]>([
    EventStatus.BEFORE,
    EventStatus.PAUSE,
  ]);

  const isOpen = openItems.includes(type);

  const title =
    type === EventStatus.BEFORE
      ? "예정된 행사"
      : type === EventStatus.PAUSE
        ? "진행중인 행사"
        : "완료된 행사";
  const textColor: string =
    type === EventStatus.AFTER ? "text-gray-900" : "text-gray-600";

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteEventList(type);

  const events = data?.pages.flatMap((page) => page.data.content) ?? [];

  useEffect(() => {
    const el = sentinelRef.current;
    if (!el || !hasNextPage || isFetchingNextPage || !isOpen) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          void fetchNextPage();
        }
      },
      { threshold: 0.1 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage, isFetchingNextPage, isOpen]);

  return (
    <Accordion
      type="multiple"
      className="w-full"
      value={openItems}
      onValueChange={setOpenItems}
    >
      <AccordionItem value={type}>
        <AccordionTrigger className="cursor-pointer">{title}</AccordionTrigger>
        <AccordionContent className={`mt-1 max-h-90 overflow-auto px-2`}>
          {events.length === 0 ? (
            <NoEventRow />
          ) : (
            events.map((item) => (
              <Link
                to={
                  type === EventStatus.AFTER
                    ? "/event/$id/result"
                    : "/event/$id/progress"
                }
                params={{ id: String(item.id) }}
                key={item.id}
              >
                <EventRow event={item} className={textColor} />
              </Link>
            ))
          )}
          {isOpen && <div ref={sentinelRef} className="h-6"></div>}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};
