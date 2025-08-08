import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@passu/ui/accordion"; // Accordion 컴포넌트 경로
import { Textarea } from "@passu/ui/textarea"; // Textarea 컴포넌트 경로

interface EventDescriptionProps {
  description: string;
}

export const EventDescription = ({ description }: EventDescriptionProps) => {
  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="item-1">
        <AccordionTrigger>
          <div />
        </AccordionTrigger>
        <AccordionContent>
          <Textarea
            readOnly
            value={description}
            className={`mt-3 h-auto bg-gray-100 text-center whitespace-pre-wrap`}
          />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};
