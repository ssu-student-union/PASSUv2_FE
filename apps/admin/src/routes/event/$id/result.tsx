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
import { createFileRoute } from "@tanstack/react-router";
import { Printer } from "lucide-react";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";

export const Route = createFileRoute("/event/$id/result")({
  component: ResultPage,
});

// Mock description
const description = `[2025-1학기 야식 행사 안내]

안녕하세요. 우리의 숭실에 확신을
제65대 총학생회 S:SURE입니다.

중간고사 기간을 맞이하여 학업으로 지친 학우분들을 위해 야식 행사를 준비하였습니다.
자세한 내용은 하단의 내용을 참고 부탁드립니다.

<행사 안내>
✅일시: 4/30(수), 5/1(목) 18:00 ~ 준비 수량 소진 시까지
✅장소: 슈파크 일대 (돌계단)
✅대상: 2025-1학기 재학생 600명 (일일 선착순 300명)
✅메뉴: 지코바 순살 양념구이(순한맛) + 밥 + 무알콜 맥주 음료

<유의 사항>
⛔번호표 배부는 17시부터 시작합니다. (줄 맡아두기 및 이탈 불가)
⛔1일 차 참여 시, 2일 차 중복 참여가 불가합니다.
⛔행사 당일 PASSU를 통해 재학 여부 확인 예정입니다.

시험기간을 보내고 계신 모든 학우 여러분의 노력이 빛나길 바라며,
확신으로 가득 찬 응원을 전합니다.

제65대 총학생회 S:SURE는 앞으로도 학우 여러분의 만족도 높은
학교생활을 위해 노력하겠습니다. 감사합니다.

-
문의
총학생회 S:SURE 복지국
인스타그램 @ssure65th
카카오톡 ‘숭실대학교 총학생회’
이메일 ssure65welfare@gmail.com`;

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

      <div style={{ display: "none" }}>
        <PrintableList ref={contentRef} />
      </div>
    </>
  );
}
