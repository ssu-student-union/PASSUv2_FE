import { EventFormRow } from "@/components/create/EventFormRow";
import { Input } from "@passu/ui/input";

interface ResultInfoRowProps {
  label: string;
  value: string | number; // 문자 또는 숫자 값을 받도록 설정
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
