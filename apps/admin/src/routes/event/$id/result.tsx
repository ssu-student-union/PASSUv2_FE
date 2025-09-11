import { useEnrolledCount, useEventDetail } from "@/api/event";
import { EventFormRow } from "@/components/event/EventFormRow";
import { EventDescription } from "@/components/result/EventDescription";
import { PrintableList } from "@/components/result/PrintableList";
import { ResultInfoRow } from "@/components/result/ResultInfoRow";
import { Sidebar } from "@/components/sidebar/Sidebar";
import { SidebarButton } from "@/components/sidebar/SidebarButton";
import { SidebarButtonGroup } from "@/components/sidebar/SidebarButtonGroup";
import { SidebarGoToEventList } from "@/components/sidebar/SidebarGoToEventList";
import { PARTICIPANT_OPTIONS } from "@/types/event";
import { createFileRoute, useParams } from "@tanstack/react-router";
import dayjs from "dayjs";
import { Printer } from "lucide-react";
import { useState } from "react";
import "@/styles/print.css";
import { PrintableEventSummary } from "@/components/result/PrintableEventSummary";

export const Route = createFileRoute("/event/$id/result")({
  component: ResultPage,
});

function ResultPage() {
  const { id } = useParams({ strict: false });
  const [printTarget, setPrintTarget] = useState<"summary" | "list" | null>(
    null,
  );

  const { data: eventDetail, isLoading, isError } = useEventDetail(Number(id));
  const { data: enrollCount } = useEnrolledCount(Number(id));

  if (isLoading) return <div>로딩 중...</div>;
  if (isError || !eventDetail) return <div>데이터를 불러오지 못했습니다.</div>;

  const participantLabel = (codes: number[]) => {
    return codes
      .map(
        (code) => PARTICIPANT_OPTIONS.find((opt) => opt.value === code)?.label,
      )
      .filter(Boolean)
      .join(", ");
  };

  const feeStatusLabel = (requireUnionFee: boolean) =>
    requireUnionFee ? "납부자, 미납자" : "납부자만";

  const resultInfoRows = [
    { label: "행사명", value: eventDetail.name },
    { label: "행사 장소", value: eventDetail.location },
    {
      label: "행사 시작 날짜",
      value: dayjs(eventDetail.startTime).format("YYYY/MM/DD"),
    },
    {
      label: "행사 종료 날짜",
      value: dayjs(eventDetail.endTime).format("YYYY/MM/DD"),
    },
    { label: "상품명", value: eventDetail.productName },
    { label: "전체 수량", value: eventDetail.productQuantity.toString() },
    { label: "소진 수량", value: enrollCount?.data.count },
    {
      label: "잔여 수량",
      value: enrollCount
        ? eventDetail.productQuantity - enrollCount?.data.count
        : eventDetail.productQuantity,
    },
    {
      label: "대상자",
      value: participantLabel(eventDetail.requireStatus),
    },
    {
      label: "학생회비 납부",
      value: feeStatusLabel(eventDetail.requireUnionFee),
    },
  ];

  return (
    <>
      <Sidebar>
        <SidebarButtonGroup>
          <SidebarButton
            onClick={() => {
              setPrintTarget("summary");
              setTimeout(() => window.print(), 100);
            }}
          >
            <Printer />
            행사 결과 인쇄
          </SidebarButton>

          <SidebarButton
            onClick={() => {
              setPrintTarget("list");
              setTimeout(() => window.print(), 100);
            }}
          >
            <Printer />
            상품수령명단 인쇄
          </SidebarButton>

          <SidebarGoToEventList />
        </SidebarButtonGroup>
      </Sidebar>

      <div
        className={`
          flex-1 overflow-y-auto px-10 py-26
          print:hidden
        `}
      >
        <div className={`flex w-full flex-col gap-12`}>
          <div className="flex justify-between">
            <span className="text-4xl font-bold">행사 결과</span>
          </div>

          <div
            className={`flex w-full flex-col gap-8 rounded-3xl bg-white p-10`}
          >
            {resultInfoRows?.map((info) => (
              <ResultInfoRow
                key={info.label}
                label={info.label}
                value={info.value ?? ""}
              />
            ))}

            <EventFormRow label="행사 설명">
              <EventDescription description={eventDetail.description} />
            </EventFormRow>
          </div>
        </div>
      </div>

      {printTarget === "summary" && (
        <div
          className={`
            hidden
            print:block
          `}
        >
          <PrintableEventSummary
            rows={resultInfoRows}
            description={eventDetail.description}
          />
        </div>
      )}

      {printTarget === "list" && (
        <div
          className={`
            hidden
            print:block
          `}
        >
          <PrintableList />
        </div>
      )}
    </>
  );
}
