import { EventFormRow } from "@/components/event/EventFormRow";
import { SelectButtonGroup } from "@/components/create/SelectButtonGroup";
import {
  FEE_OPTIONS,
  PARTICIPANT_OPTIONS,
  type EventFormValues,
} from "@/types/event";
import { Button } from "@passu/ui/button";
import { Input } from "@passu/ui/input";
import { NumberInput } from "@passu/ui/number-input";
import { Textarea } from "@passu/ui/textarea";
import { Link, useNavigate, useParams } from "@tanstack/react-router";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import dayjs from "dayjs";
import { useCreateEvent, useEventDetail, useUpdateEvent } from "@/api/event";
interface Props {
  mode: "create" | "edit";
}

export function EventFormPage({ mode }: Props) {
  const { id } = useParams({ strict: false });
  const navigate = useNavigate();
  const isEdit = mode === "edit";

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<EventFormValues>({
    mode: "onSubmit",
    defaultValues: {
      title: "",
      location: "",
      startDate: "",
      endDate: "",
      time: "",
      product: "",
      quantity: 1,
      participants: [],
      feeStatus: [],
      description: "",
    },
  });

  const { mutate: createEvent } = useCreateEvent({
    onSuccess: (data) => {
      console.log("행사 생성 성공: ", data);
      void navigate({ to: "/" });
    },
    onError: (error) => {
      console.error("행사 생성 실패:", error);
    },
  });

  const { mutate: updateEvent } = useUpdateEvent({
    onSuccess: (data) => {
      console.log("행사 수정 성공: ", data);
      void navigate({ to: "/" });
    },
    onError: (error) => {
      console.error("행사 수정 실패:", error);
    },
  });

  const { data: eventDetail } = useEventDetail(Number(id), {
    enabled: isEdit && !!id,
  });

  const toISO = (date: string, time: string) => {
    return dayjs(`${date}T${time}`).toISOString();
  };

  useEffect(() => {
    if (isEdit && eventDetail) {
      const start = dayjs(eventDetail.startTime);
      const end = dayjs(eventDetail.endTime);

      reset({
        title: eventDetail.name,
        location: eventDetail.location,
        startDate: start.format("YYYY-MM-DD"),
        endDate: end.format("YYYY-MM-DD"),
        time: start.format("HH:mm"),
        product: eventDetail.productName,
        quantity: eventDetail.productQuantity,
        participants: PARTICIPANT_OPTIONS.filter((opt) =>
          eventDetail.requireStatus.includes(opt.value),
        ),
        feeStatus: FEE_OPTIONS.filter((opt) =>
          eventDetail.requireUnionFee
            ? opt.value === "PAID"
            : opt.value === "UNPAID",
        ),
        description: eventDetail.description,
      });
    }
  }, [isEdit, eventDetail, reset]);

  const onSubmit = (formData: EventFormValues) => {
    const participantValues = formData.participants.map((p) => p.value);
    const requireUnionFee = formData.feeStatus.some(
      (opt) => opt.value === "PAID",
    );

    const payload = {
      name: formData.title,
      location: formData.location,
      productName: formData.product,
      description: formData.description,
      productQuantity: formData.quantity,
      requireStatus: participantValues,
      requireUnionFee,
      startTime: toISO(formData.startDate, formData.time),
      endTime: toISO(formData.endDate, formData.time),
    };

    if (isEdit && id) {
      updateEvent({ id: Number(id), data: payload });
    } else {
      createEvent(payload);
    }
  };

  return (
    <form
      onSubmit={(e) => void handleSubmit(onSubmit)(e)}
      className={`flex w-full flex-col gap-7 overflow-y-scroll px-30 py-20`}
    >
      <h1 className="text-4xl font-bold">
        {isEdit ? "행사 수정" : "행사 생성"}
      </h1>
      <div className="flex flex-col gap-8 rounded-3xl bg-white px-12 py-8">
        <EventFormRow label="행사명" error={errors.title?.message}>
          <Input
            {...register("title", { required: "행사명을 입력해주세요." })}
            placeholder="행사명을 입력하세요"
          />
        </EventFormRow>

        <EventFormRow label="행사 장소" error={errors.location?.message}>
          <Input
            {...register("location", { required: "행사 장소를 입력해주세요." })}
            placeholder="장소를 입력하세요"
          />
        </EventFormRow>

        <EventFormRow label="행사 시작 날짜" error={errors.startDate?.message}>
          <Input
            type="date"
            {...register("startDate", {
              required: "행사 시작 날짜를 입력해주세요.",
            })}
            placeholder="YYYY/MM/DD ~ YYYY/MM/DD"
          />
        </EventFormRow>

        <EventFormRow label="행사 종료 날짜" error={errors.endDate?.message}>
          <Input
            type="date"
            {...register("endDate", {
              required: "행사 종료 날짜를 입력해주세요.",
            })}
            placeholder="YYYY/MM/DD ~ YYYY/MM/DD"
          />
        </EventFormRow>

        <EventFormRow label="행사 시작 시간" error={errors.time?.message}>
          <Input
            {...register("time", { required: "행사 시간을 입력해주세요" })}
            placeholder="15:00"
            type="time"
          />
        </EventFormRow>

        <EventFormRow label="상품명" error={errors.product?.message}>
          <Input
            {...register("product", { required: "상품명을 입력해주세요." })}
          />
        </EventFormRow>

        <EventFormRow label="상품 수량" error={errors.quantity?.message}>
          <Controller
            name="quantity"
            control={control}
            render={({ field }) => (
              <NumberInput
                className="h-12 w-40"
                value={field.value}
                onChange={field.onChange}
              />
            )}
          />
        </EventFormRow>

        <Controller
          name="participants"
          control={control}
          rules={{
            validate: (value) => value.length > 0 || "대상자를 선택해주세요",
          }}
          render={({ field, fieldState }) => (
            <EventFormRow label="대상자" error={fieldState.error?.message}>
              <SelectButtonGroup
                options={PARTICIPANT_OPTIONS}
                value={field.value}
                onChange={field.onChange}
              />
            </EventFormRow>
          )}
        />

        <Controller
          name="feeStatus"
          control={control}
          rules={{
            validate: (value) => {
              const hasPaid = value.some((v) => v.value === "PAID");
              const hasUnpaid = value.some((v) => v.value === "UNPAID");

              if (!hasPaid && hasUnpaid) {
                return "미납자만 선택할 수 없습니다";
              }

              if (!hasPaid && !hasUnpaid) {
                return "학생회비 여부를 선택해주세요.";
              }

              return true;
            },
          }}
          render={({ field, fieldState }) => (
            <EventFormRow
              label="학생회비 납부"
              error={fieldState.error?.message}
            >
              <SelectButtonGroup
                options={FEE_OPTIONS}
                value={field.value}
                onChange={field.onChange}
              />
            </EventFormRow>
          )}
        />

        <EventFormRow label="행사 설명" error={errors.description?.message}>
          <Textarea
            {...register("description", {
              required: "행사 설명을 입력해주세요",
            })}
            placeholder="행사에 대한 설명을 입력해주세요."
          />
        </EventFormRow>
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
