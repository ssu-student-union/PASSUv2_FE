import { Button } from "@passu/ui/button";
import {
  Modal,
  ModalContent,
  ModalDescription,
  ModalFooter,
  ModalHeader,
  ModalTitle,
} from "@passu/ui/modal";

interface FinishModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export const FinishModal = ({ open, onClose, onConfirm }: FinishModalProps) => {
  return (
    <Modal open={open} onOpenChange={onClose}>
      <ModalContent className="w-110 px-6 pt-6 pb-10" showCloseButton>
        <ModalHeader className="flex flex-col items-center gap-1">
          <ModalTitle className="text-lg font-semibold">
            행사를 종료하시겠습니까?
          </ModalTitle>
          <ModalDescription className="text-sm text-gray-600">
            종료된 행사는 수정할 수 없습니다.
          </ModalDescription>
        </ModalHeader>

        <ModalFooter
          className={`
            mt-6 flex justify-center gap-4
            sm:justify-center
          `}
        >
          <Button
            variant="outline"
            onClick={onClose}
            className="h-8 w-20 border-gray-400 text-gray-700"
          >
            아니요
          </Button>
          <Button onClick={onConfirm} className="h-8 w-20">
            예
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
