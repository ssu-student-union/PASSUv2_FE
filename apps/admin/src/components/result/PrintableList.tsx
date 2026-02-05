import { useParams } from "@tanstack/react-router";
import { useEnrollmentList, useEventDetail, useUserInfo } from "@/api/event";
import dayjs from "dayjs";

interface PrintableListProps {
  ref?: React.Ref<HTMLDivElement>;
}

export const PrintableList = ({ ref }: PrintableListProps) => {
  const { id } = useParams({ from: "/event/$id/result" });
  const eventId = Number(id);

  const { data: eventDetail } = useEventDetail(eventId);
  const { data: userInfo } = useUserInfo();
  const {
    data: enrollmentData,
    isLoading,
    isError,
  } = useEnrollmentList(eventId);

  const enrollments = enrollmentData?.data ?? [];
  const userName = userInfo?.data.name ?? userInfo?.data.major;

  return (
    <div ref={ref} className={`mx-auto w-full px-6 py-8 text-sm text-black`}>
      <div className="text-center">
        <h1 className="text-2xl font-bold">상품수령 명단</h1>
        <p className="mt-2 text-lg whitespace-pre-line">
          {`<${userName}, ${eventDetail?.name ?? "-"}, ${
            eventDetail?.startTime
              ? dayjs(eventDetail.startTime).format("YYYY-MM-DD")
              : "-"
          }>`}
        </p>
      </div>

      <table
        className={`
          mt-8 w-full table-fixed border-collapse border-3 border-black
          text-center
        `}
      >
        <thead className="bg-gray-100 text-sm">
          <tr>
            <th className="border-3 border-black px-2 py-1">순번</th>
            <th className="border-3 border-black px-2 py-1">이름</th>
            <th className="border-3 border-black px-2 py-1">학과</th>
            <th className="border-3 border-black px-2 py-1">학번</th>
            <th className="border-3 border-black px-2 py-1">종류</th>
            <th className="border-3 border-black px-2 py-1">타임스탬프</th>
            <th className="border-3 border-black px-2 py-1">수량</th>
            <th className="border-3 border-black px-2 py-1">인증번호</th>
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
              <tr key={row.enrollmentId} className="text-sm">
                <td className="border-3 border-black px-2 py-1">{index + 1}</td>
                <td className={`border-3 border-black px-2 py-1`}>
                  {row.studentName}
                </td>
                <td className={`border-3 border-black px-2 py-1`}>
                  {row.studentDepartment}
                </td>
                <td className="border-3 border-black px-2 py-1">
                  {row.studentId}
                </td>
                <td className="border-3 border-black px-2 py-1">
                  {eventDetail?.productName}
                </td>
                <td className="border-3 border-black px-2 py-1">
                  {dayjs
                    .utc(row.timestamp)
                    .tz("Asia/Seoul")
                    .format("YYYY-MM-DD HH:mm:ss")}
                </td>
                <td className="border-3 border-black px-2 py-1">1</td>
                <td className="border-3 border-black px-2 py-1">
                  {row.randomKey}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};
