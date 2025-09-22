import { EventFormRow } from "@/components/event/EventFormRow";
import { Input } from "@passu/ui/input";

interface ResultInfoRowProps {
  label: string;
  value: string | number;
}

export const ResultInfoRow = ({ label, value }: ResultInfoRowProps) => {
  return (
    <EventFormRow label={label}>
      <Input
        value={value}
        disabled
        className={`
          text-center text-black
          disabled:opacity-100
        `}
      />
    </EventFormRow>
  );
};
