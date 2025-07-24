import { EventFormRow } from "@/components/create/EventFormRow";
import { SelectButtonGroup } from "@/components/create/SelectButtonGroup";
import { Button } from "@passu/ui/button";
import { Input } from "@passu/ui/input";
import { NumberInput } from "@passu/ui/number-input";
import { Textarea } from "@passu/ui/textarea";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/event/create")({
  component: CreatePage,
});

function CreatePage() {
  return (
    <div className="flex w-full flex-col gap-7 overflow-y-scroll px-30 py-20">
      <div className="text-4xl font-bold">행사 생성</div>
      <div className="flex flex-col gap-8 rounded-3xl bg-white px-12 py-8">
        <EventFormRow label="행사명">
          <Input placeholder="행사명을 입력하세요" />
        </EventFormRow>
        <EventFormRow label="행사 장소">
          <Input placeholder="장소를 입력하세요" />
        </EventFormRow>
        <EventFormRow label="행사 시작 날짜">
          <Input placeholder="YYYY/MM/DD ~ YYYY/MM/DD" />
        </EventFormRow>
        <EventFormRow label="행사 시작 시간">
          <Input placeholder="15:00" />
        </EventFormRow>
        <EventFormRow label="상품명">
          <Input />
        </EventFormRow>
        <EventFormRow label="상품 수량">
          <NumberInput className="h-12 w-40" />
        </EventFormRow>
        <EventFormRow label="대상자">
          <SelectButtonGroup
            options={["재학생", "휴학생", "졸업 유예", "졸업생"]}
            multiple
          />
        </EventFormRow>
        <EventFormRow label="학생회비 납부">
          <SelectButtonGroup options={["납부자", "미납자"]} multiple />
        </EventFormRow>
        <EventFormRow label="행사 설명">
          <Textarea />
        </EventFormRow>
      </div>
      <div className="flex w-full justify-center gap-8">
        <Button
          variant="outline"
          asChild
          className={`
            h-12 w-60 rounded-full border-2 txt-subtitle1 text-hover
            hover:text-hover
          `}
        >
          <a href="/">뒤로가기</a>
        </Button>
        <Button className={`h-12 w-60 rounded-full border-2 txt-subtitle1`}>
          완료
        </Button>
      </div>
    </div>
  );
}
