import "@/styles/print.css";
import { useParams } from "@tanstack/react-router";
import { useEnrollmentList, useEventDetail } from "@/api/event";
import dayjs from "dayjs";

interface PrintableListProps {
  ref?: React.Ref<HTMLDivElement>;
}

export const PrintableList = ({ ref }: PrintableListProps) => {
  const { id } = useParams({ from: "/event/$id/result" });
  const eventId = Number(id);

  const { data: eventDetail } = useEventDetail(eventId);
  const {
    data: enrollmentData,
    isLoading,
    isError,
  } = useEnrollmentList(eventId);

  const enrollments = enrollmentData?.data ?? [];

  return (
    <div ref={ref} className="p-8">
      <div className="text-center">
        <h1 className="text-2xl font-bold">상품수령 명단</h1>
        <p className="mt-2 text-lg">
          {`<단위명, ${eventDetail?.name ?? "-"}, ${
            eventDetail?.startTime
              ? dayjs(eventDetail.startTime).format("YYYY-MM-DD")
              : "-"
          }>`}
        </p>
      </div>

      <table
        className={`
          mt-8 w-full border-collapse border-2 border-black text-center
          print:mt-12
        `}
      >
        <thead>
          <tr className="border-t-3 border-black">
            <th className="border-3 border-black p-2">순번</th>
            <th className="border-3 border-black p-2">이름</th>
            <th className="border-3 border-black p-2">학과</th>
            <th className="border-3 border-black p-2">학번</th>
            <th className="border-3 border-black p-2">종류</th>
            <th className="border-3 border-black p-2">타임스탬프</th>
            <th className="border-3 border-black p-2">수량</th>
            <th className="border-3 border-black p-2">인증번호</th>
          </tr>
        </thead>
        <tbody>
          {isLoading || isError ? (
            <tr>
              <td colSpan={8} className="p-4 text-center">
                {isLoading ? "불러오는 중..." : "데이터를 불러올 수 없습니다."}
              </td>
            </tr>
          ) : enrollments.length === 0 ? (
            <tr>
              <td colSpan={8} className="p-4 text-center">
                등록된 사용자가 없습니다.
              </td>
            </tr>
          ) : (
            enrollments.map((row, index) => (
              <tr key={row.enrollmentId}>
                <td className="h-10 border-3 border-black p-2">{index + 1}</td>
                <td className="border-3 border-black p-2 whitespace-nowrap">
                  {row.studentName}
                </td>
                <td className="border-3 border-black p-2 whitespace-nowrap">
                  {row.studentDepartment}
                </td>
                <td className="border-3 border-black p-2">{row.studentId}</td>
                <td className="border-3 border-black p-2">
                  {eventDetail?.productName}
                </td>
                <td className="border-3 border-black p-2">
                  {dayjs(row.timestamp).format("YYYY-MM-DD HH:mm:ss")}
                </td>
                <td className="border-3 border-black p-2">1</td>
                <td className="border-3 border-black p-2">{row.randomKey}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};
