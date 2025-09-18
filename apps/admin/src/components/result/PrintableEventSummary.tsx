interface PrintableEventSummaryProps {
  rows: { label: string; value: React.ReactNode }[];
  description?: string;
}

export const PrintableEventSummary = ({
  rows,
  description,
}: PrintableEventSummaryProps) => {
  const extendedRows = description
    ? [
        ...rows,
        {
          label: "행사 설명",
          value: <pre className="whitespace-pre-wrap">{description}</pre>,
        },
      ]
    : rows;

  return (
    <div
      className={`
        mx-auto w-full px-6 py-8 text-sm text-black
        print:w-full
      `}
    >
      <h1 className="mb-6 text-center text-2xl font-bold">행사 결과 요약</h1>

      <table className="w-full table-fixed border-3 border-black">
        <tbody>
          {extendedRows.map((row) => (
            <tr key={row.label}>
              <th
                className={`
                  w-1/4 border-3 border-black bg-gray-100 px-4 py-2 text-left
                  align-top
                `}
              >
                {row.label}
              </th>
              <td className="border-3 border-black px-4 py-2">{row.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
