import * as React from "react";
import "@/styles/print.css";

interface PrintableListProps {
  ref?: React.Ref<HTMLDivElement>;
}

export const PrintableList = ({ ref }: PrintableListProps) => {
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
    <div ref={ref} className="p-8">
      <div className="text-center">
        <h1 className="text-2xl font-bold">상품수령 명단</h1>
        <p className="mt-2 text-lg">{"<단위명, 행사명, 수령날짜>"}</p>
      </div>

      <table
        className={`
          mt-8 w-full border-collapse border-2 border-black text-center
          print:mt-12
        `}
      >
        <thead>
          <tr>
            <th className="border-2 border-black p-2">순번</th>
            <th className="border-2 border-black p-2">이름</th>
            <th className="border-2 border-black p-2">학과</th>
            <th className="border-2 border-black p-2">학번</th>
            <th className="border-2 border-black p-2">종류</th>
            <th className="border-2 border-black p-2">수량</th>
            <th className="border-2 border-black p-2">서명 또는 날인</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row.id}>
              <td className="h-10 border-2 border-black p-2">{row.id}</td>
              <td className="border-2 border-black p-2"></td>
              <td className="border-2 border-black p-2"></td>
              <td className="border-2 border-black p-2"></td>
              <td className="border-2 border-black p-2"></td>
              <td className="border-2 border-black p-2"></td>
              <td className="border-2 border-black p-2"></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
