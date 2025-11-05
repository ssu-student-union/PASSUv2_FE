import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { CircleAlert } from "lucide-react";

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
}: EventInfoTooltipProps) => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <CircleAlert size={18} className="cursor-pointer text-gray-400" />
      </TooltipTrigger>

      <TooltipContent
        side="bottom"
        sideOffset={10}
        className={`
          rounded-xl border border-gray-200 bg-white p-0 text-gray-900 shadow-xl
        `}
      >
        <div className={`relative z-20 rounded-xl bg-white px-8 py-6 text-lg`}>
          <div className={`grid grid-cols-[auto_1fr] gap-x-6 gap-y-3`}>
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
      </TooltipContent>
    </Tooltip>
  );
};
