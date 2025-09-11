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
    <div className={`flex w-full flex-col justify-center text-sm text-black`}>
      <h1 className="mb-6 text-center text-2xl font-bold">행사 결과 요약</h1>

      <table className="mb-8 w-full border-3 border-black">
        <tbody>
          {extendedRows.map((row) => (
            <tr key={row.label}>
              <th
                className={`
                  w-1/4 border-3 border-black bg-gray-100 px-4 py-2 text-left
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
