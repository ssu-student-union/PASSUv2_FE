import { Button } from "@passu/ui/button";
import {
  Modal,
  ModalContent,
  ModalDescription,
  ModalFooter,
  ModalHeader,
  ModalTitle,
} from "@passu/ui/modal";

interface ConfirmModalProps {
  onClose: () => void;
  title: string;
  subTitle?: string;
  onConfirm: () => void;
  open: boolean;
}

export const ConfirmModal = ({
  onClose,
  onConfirm,
  title,
  subTitle,
  open,
}: ConfirmModalProps) => {
  return (
    <Modal open={open} onOpenChange={onClose}>
      <ModalContent className="w-110 px-6 pt-6 pb-10" showCloseButton>
        <ModalHeader className="flex flex-col items-center gap-1">
          <ModalTitle className="text-lg font-semibold">{title}</ModalTitle>
          <ModalDescription className="text-sm text-gray-600">
            {subTitle}
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
