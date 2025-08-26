import { Button } from "@passu/ui/button";
import { Link } from "@tanstack/react-router";
import { useEventForm } from "@/hooks/useEventForm";
import { EventFormFields } from "@/components/event/EventFormFields";
interface Props {
  mode: "create" | "edit";
}

export function EventFormPage({ mode }: Props) {
  const { form, onSubmit, isEdit } = useEventForm(mode);

  return (
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
        <Button variantType="form-actions" type="submit">
          완료
        </Button>
      </div>
    </form>
  );
}
