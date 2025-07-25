import { EventFormRow } from "@/components/create/EventFormRow";
import { SelectButtonGroup } from "@/components/create/SelectButtonGroup";
import { Button } from "@passu/ui/button";
import { Input } from "@passu/ui/input";
import { NumberInput } from "@passu/ui/number-input";
import { Textarea } from "@passu/ui/textarea";
import { createFileRoute } from "@tanstack/react-router";

const PARTICIPANT_OPTIONS = ["재학생", "휴학생", "졸업 유예", "졸업생"];
const FEE_OPTIONS = ["납부자", "미납자"];

const formFields = [
  { label: "행사명", element: <Input placeholder="행사명을 입력하세요" /> },
  { label: "행사 장소", element: <Input placeholder="장소를 입력하세요" /> },
  {
    label: "행사 시작 날짜",
    element: <Input placeholder="YYYY/MM/DD ~ YYYY/MM/DD" />,
  },
  { label: "행사 시작 시간", element: <Input placeholder="15:00" /> },
  { label: "상품명", element: <Input /> },
  { label: "상품 수량", element: <NumberInput className="h-12 w-40" /> },
  {
    label: "대상자",
    element: <SelectButtonGroup options={PARTICIPANT_OPTIONS} />,
  },
  {
    label: "학생회비 납부",
    element: <SelectButtonGroup options={FEE_OPTIONS} />,
  },
  {
    label: "행사 설명",
    element: <Textarea placeholder="행사에 대한 설명을 입력해주세요." />,
  },
];

export const Route = createFileRoute("/event/create")({
  component: CreatePage,
});

function CreatePage() {
  return (
    <div className="flex w-full flex-col gap-7 overflow-y-scroll px-30 py-20">
      <h1 className="text-4xl font-bold">행사 생성</h1>

      <div className="flex flex-col gap-8 rounded-3xl bg-white px-12 py-8">
        {formFields.map(({ label, element }) => (
          <EventFormRow key={label} label={label}>
            {element}
          </EventFormRow>
        ))}
      </div>

      <div className="flex w-full justify-center gap-8">
        <Button variantType="form-actions" variant="outline" asChild>
          <a href="/">뒤로가기</a>
        </Button>
        <Button variantType="form-actions">완료</Button>
      </div>
    </div>
  );
}
