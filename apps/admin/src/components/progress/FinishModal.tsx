import { Button } from "@passu/ui/button";
import { X } from "lucide-react";

interface FinishModalProps {
  onClose: () => void;
  onConfirm: () => void;
}

export const FinishModal = ({ onClose, onConfirm }: FinishModalProps) => {
  return (
    <div
      className={`
        flex h-45 w-110 flex-col gap-4 rounded-sm border-1 border-gray-400
        bg-white px-4 pt-4 pb-16
      `}
    >
      <button type="button" onClick={onClose} className={`flex justify-end`}>
        <X className="size-5" />
      </button>

      <div className={`flex w-full flex-col items-center justify-center`}>
        <h2 className="text-lg txt-subtitle1 leading-none font-semibold">
          행사를 종료하시겠습니까?
        </h2>
        <p className="text-sm txt-subtitle2 text-gray-500">
          종료된 행사는 수정할 수 없습니다.
        </p>
      </div>

      <div className={`flex items-center justify-center gap-6`}>
        <Button
          variant="outline"
          onClick={onClose}
          className={`h-8 w-20 border-gray-400 text-gray-700`}
        >
          아니요
        </Button>
        <Button onClick={onConfirm} className="h-8 w-20">
          예
        </Button>
      </div>
    </div>
  );
};
