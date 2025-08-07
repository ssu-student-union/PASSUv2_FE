import * as React from "react";

export const PrintableList = React.forwardRef<HTMLDivElement>((_, ref) => {
  // api 호출
  const data = Array.from({ length: 50 }, (_, i) => ({
    id: i + 1,
    name: "",
    department: "",
    studentId: "",
    type: "",
    quantity: "",
    signature: "",
  }));

  return (
    <>
      {/* 인쇄 시 모든 페이지에 일관된 여백을 적용하기 위한 스타일 */}
      <style>{`
        @media print {
          @page { 
            margin: 2rem;
          }
        }
      `}</style>

      <div ref={ref} className="p-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold">상품수령 명단</h1>
          <p className="mt-2 text-lg">{"<단위명, 행사명, 수령날짜>"}</p>
        </div>

        <table
          className={`
            mt-8 w-full border-collapse border border-black text-center
            print:mt-12
          `}
        >
          <thead>
            <tr>
              <th className="border border-black p-2">순번</th>
              <th className="border border-black p-2">이름</th>
              <th className="border border-black p-2">학과</th>
              <th className="border border-black p-2">학번</th>
              <th className="border border-black p-2">종류</th>
              <th className="border border-black p-2">수량</th>
              <th className="border border-black p-2">서명 또는 날인</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row) => (
              <tr key={row.id}>
                <td className="h-10 border border-black p-2">{row.id}</td>
                <td className="border border-black p-2"></td>
                <td className="border border-black p-2"></td>
                <td className="border border-black p-2"></td>
                <td className="border border-black p-2"></td>
                <td className="border border-black p-2"></td>
                <td className="border border-black p-2"></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
});
