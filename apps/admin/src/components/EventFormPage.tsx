import { Button } from "@passu/ui/button";
import { Link, useNavigate, useParams } from "@tanstack/react-router";
import { useEventForm } from "@/hooks/useEventForm";
import { EventFormFields } from "@/components/event/EventFormFields";
import { useDeleteEvent } from "@/api/event";
import { useState } from "react";
import { ConfirmModal } from "@/components/ConfirmModal";
interface Props {
  mode: "create" | "edit";
}

export function EventFormPage({ mode }: Props) {
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);
  const { id } = useParams({ strict: false });
  const { form, onSubmit, isEdit } = useEventForm(mode);

  const { mutate: deleteEvent } = useDeleteEvent({
    onSuccess: () => navigate({ to: "/" }),
  });

  return (
    <>
      <form
        onSubmit={(e) => void form.handleSubmit(onSubmit)(e)}
        className={`flex w-full flex-col gap-7 overflow-y-scroll px-30 py-20`}
      >
        <h1 className="text-4xl font-bold">
          {isEdit ? "행사 수정" : "행사 생성"}
        </h1>
        <div className="flex flex-col gap-8 rounded-3xl bg-white px-12 py-8">
          <EventFormFields form={form} />
        </div>

        <div className="flex w-full justify-center gap-8">
          <Button variantType="form-actions" variant="outline" asChild>
            <Link to="/">뒤로가기</Link>
          </Button>
          {mode === "edit" && (
            <Button
              variantType="form-actions"
              variant="outline"
              type="button"
              onClick={() => setOpenModal(true)}
            >
              행사 삭제
            </Button>
          )}
          <Button variantType="form-actions" type="submit">
            완료
          </Button>
        </div>
      </form>

      {openModal && (
        <div
          className={`
            fixed inset-0 flex items-center justify-center bg-black/40
          `}
        >
          <ConfirmModal
            title="행사를 삭제하시겠습니까?"
            subTitle="삭제한 행사는 복구할 수 없습니다."
            onClose={() => setOpenModal(false)}
            onConfirm={() => deleteEvent(Number(id))}
          />
        </div>
      )}
    </>
  );
}
