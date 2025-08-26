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
import { useEffect, useRef } from "react";

interface EventAccordionProps {
  variant: "upcoming" | "completed";
}

export const EventAccordion = ({ variant }: EventAccordionProps) => {
  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const title = variant === "upcoming" ? "예정된 행사" : "완료된 행사";
  const textColor: string =
    variant === "upcoming" ? "text-gray-900" : "text-gray-600";
  const type = variant === "upcoming" ? "BEFORE" : "AFTER";

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteEventList(type);

  const events = data?.pages.flatMap((page) => page.data.content) ?? [];

  useEffect(() => {
    const el = sentinelRef.current;
    if (!el || !hasNextPage || isFetchingNextPage) return;

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
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  return (
    <Accordion
      type="multiple"
      className="w-full"
      defaultValue={["upcoming", "completed"]}
    >
      <AccordionItem value={variant}>
        <AccordionTrigger className="cursor-pointer">{title}</AccordionTrigger>
        <AccordionContent className={`mt-1 max-h-50 overflow-auto px-2`}>
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
          <div ref={sentinelRef} className="h-6"></div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};
