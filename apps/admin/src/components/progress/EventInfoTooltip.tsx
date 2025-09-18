import { cn } from "@passu/ui/utils";

interface EventInfoTooltipProps {
  name: string;
  location: string;
  productName: string;
  target: string;
  feeStatus: string;
  className?: string;
}

export const EventInfoTooltip = ({
  name,
  location,
  productName,
  target,
  feeStatus,
  className,
}: EventInfoTooltipProps) => {
  return (
    <div
      className={cn(
        "absolute left-1/2 z-50 mt-2 min-w-max -translate-x-1/2",
        className,
      )}
    >
      <div
        className={`
          absolute -top-2 left-1/2 z-10 h-4 w-4 -translate-x-1/2 rotate-45
          border-t border-l border-gray-200 bg-white
        `}
      />

      <div
        className={`
          relative z-20 rounded-xl border border-gray-200 bg-white px-8 py-6
          text-lg shadow-xl
        `}
      >
        <div className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-3">
          <span className="font-bold whitespace-nowrap">행사명</span>
          <span>{name}</span>

          <span className="font-bold whitespace-nowrap">행사 장소</span>
          <span>{location}</span>

          <span className="font-bold whitespace-nowrap">상품명</span>
          <span>{productName}</span>

          <span className="font-bold whitespace-nowrap">대상자</span>
          <span>{target}</span>

          <span className="font-bold whitespace-nowrap">학생회비 납부</span>
          <span>{feeStatus}</span>
        </div>
      </div>
    </div>
  );
};
