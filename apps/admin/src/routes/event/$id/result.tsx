import { EventFormRow } from "@/components/event/EventFormRow";
import { EventDescription } from "@/components/result/EventDescription";
import { PrintableList } from "@/components/result/PrintableList";
import { ResultInfoRow } from "@/components/result/ResultInfoRow";
import { Sidebar } from "@/components/sidebar/Sidebar";
import { SidebarButton } from "@/components/sidebar/SidebarButton";
import { SidebarButtonGroup } from "@/components/sidebar/SidebarButtonGroup";
import { SidebarDownloadListButton } from "@/components/sidebar/SidebarDownloadListButton";
import { SidebarGoToEventList } from "@/components/sidebar/SidebarGoToEventList";
import { SidebarListSection } from "@/components/sidebar/SidebarListSection";
import { description } from "@/mocks/event";
import { createFileRoute } from "@tanstack/react-router";
import { Printer } from "lucide-react";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";

export const Route = createFileRoute("/event/$id/result")({
  component: ResultPage,
});

const resultInfoRows = [
  { label: "행사명", value: "2025-1학기 야식행사" },
  { label: "행사 장소", value: "슈파크 일대 (돌계단) / 우천 시 학생식당" },
  { label: "행사 시작 날짜", value: "2025/04/30" },
  { label: "행사 종료 날짜", value: "2025/05/01" },
  {
    label: "상품명",
    value: "지코바 순살 양념구이(순한맛) + 밥 + 무알콜 맥주 음료",
  },
  { label: "전체 수량", value: "600" },
  { label: "소진 수량", value: "590" },
  { label: "잔여 수량", value: "10" },
  { label: "대상자", value: "재학생" },
  { label: "학생회비 납부", value: "납부자, 미납부자" },
];

function ResultPage() {
  const contentRef = useRef<HTMLDivElement>(null);

  const handlePrint = useReactToPrint({
    contentRef,
  });

  return (
    <>
      <Sidebar>
        <SidebarButtonGroup>
          <SidebarButton onClick={() => contentRef.current && handlePrint()}>
            <Printer />
            상품수령명단 인쇄
          </SidebarButton>

          <SidebarDownloadListButton />

          <SidebarGoToEventList />
        </SidebarButtonGroup>

        <SidebarListSection />
      </Sidebar>

      <div className="flex-1 overflow-y-auto px-10 py-26">
        <div className={`flex w-full flex-col gap-12`}>
          <div className="flex justify-between">
            <span className="text-4xl font-bold">행사 결과</span>
          </div>

          <div
            className={`flex w-full flex-col gap-8 rounded-3xl bg-white p-10`}
          >
            {resultInfoRows.map((info) => (
              <ResultInfoRow
                key={info.label}
                label={info.label}
                value={info.value}
              />
            ))}

            <EventFormRow label="행사 설명">
              <EventDescription description={description} />
            </EventFormRow>
          </div>
        </div>
      </div>

      <div className="hidden">
        <PrintableList ref={contentRef} />
      </div>
    </>
  );
}
