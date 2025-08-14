import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@passu/ui/accordion";
import TextareaAutosize from "react-textarea-autosize";

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
          <TextareaAutosize
            readOnly
            value={description}
            className={`
              mt-3 field-sizing-content w-full resize-none bg-gray-100 p-3
              text-center whitespace-pre-wrap
            `}
          />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};
