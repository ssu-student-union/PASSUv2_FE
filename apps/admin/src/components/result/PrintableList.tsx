import * as React from "react";

// forwardRef를 사용하여 부모 컴포넌트에서 이 컴포넌트의 DOM에 접근할 수 있도록 합니다.
export const PrintableList = React.forwardRef<HTMLDivElement>((_, ref) => {
  // 실제 데이터는 props나 API 호출을 통해 받아옵니다. 여기서는 예시입니다.
  const data = Array.from({ length: 18 }, (_, i) => ({
    id: i + 1,
    name: "",
    department: "",
    studentId: "",
    type: "",
    quantity: "",
    signature: "",
  }));

  return (
    // 이 div 전체가 인쇄될 내용입니다.
    <div ref={ref} className="p-8">
      <div className="text-center">
        <h1 className="text-2xl font-bold">상품수령 명단</h1>
        <p className="mt-2 text-lg">{"<단위명, 행사명, 수령날짜>"}</p>
      </div>

      <table
        className={`mt-8 w-full border-collapse border border-black text-center`}
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
  );
});
