// components/event/EventFormFields.tsx
import { Controller, type UseFormReturn } from "react-hook-form";
import {
  FEE_OPTIONS,
  PARTICIPANT_OPTIONS,
  type EventFormValues,
} from "@/types/event";
import { EventFormRow } from "./EventFormRow";
import { Input } from "@passu/ui/input";
import { Textarea } from "@passu/ui/textarea";
import { NumberInput } from "@passu/ui/number-input";
import { SelectButtonGroup } from "@/components/create/SelectButtonGroup";

interface Props {
  form: UseFormReturn<EventFormValues>;
}

export function EventFormFields({ form }: Props) {
  const {
    register,
    control,
    formState: { errors },
  } = form;

  return (
    <>
      <EventFormRow label="행사명" error={errors.title?.message}>
        <Input {...register("title", { required: "행사명을 입력해주세요." })} />
      </EventFormRow>

      <EventFormRow label="행사 장소" error={errors.location?.message}>
        <Input
          {...register("location", { required: "장소를 입력해주세요." })}
        />
      </EventFormRow>

      <EventFormRow label="행사 시작 날짜" error={errors.startDate?.message}>
        <Input
          type="date"
          {...register("startDate", { required: "시작 날짜 입력" })}
        />
      </EventFormRow>

      <EventFormRow label="행사 종료 날짜" error={errors.endDate?.message}>
        <Input
          type="date"
          {...register("endDate", { required: "종료 날짜 입력" })}
        />
      </EventFormRow>

      <EventFormRow label="행사 시작 시간" error={errors.time?.message}>
        <Input type="time" {...register("time", { required: "시간 입력" })} />
      </EventFormRow>

      <EventFormRow label="상품명" error={errors.product?.message}>
        <Input
          {...register("product", { required: "상품명을 입력해주세요" })}
        />
      </EventFormRow>

      <EventFormRow label="상품 수량" error={errors.quantity?.message}>
        <Controller
          name="quantity"
          control={control}
          render={({ field }) => (
            <NumberInput value={field.value} onChange={field.onChange} />
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
            <SelectButtonGroup options={PARTICIPANT_OPTIONS} {...field} />
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
            if (!hasPaid && hasUnpaid) return "미납자만 선택할 수 없습니다";
            if (!hasPaid && !hasUnpaid) return "학생회비 여부를 선택해주세요.";
            return true;
          },
        }}
        render={({ field, fieldState }) => (
          <EventFormRow label="학생회비 납부" error={fieldState.error?.message}>
            <SelectButtonGroup options={FEE_OPTIONS} {...field} />
          </EventFormRow>
        )}
      />

      <EventFormRow label="행사 설명" error={errors.description?.message}>
        <Textarea
          {...register("description", { required: "설명을 입력해주세요" })}
        />
      </EventFormRow>
    </>
  );
}
