import { EventFormRow } from "@/components/create/EventFormRow";
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
import { useParams } from "@tanstack/react-router";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";

interface Props {
  mode: "create" | "edit";
}

export function EventFormPage({ mode }: Props) {
  const { id } = useParams({ strict: false });
  const isEdit = mode === "edit";

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<EventFormValues>({
    mode: "onSubmit",
    defaultValues: {
      title: "",
      location: "",
      date: "",
      time: "",
      product: "",
      quantity: 1,
      participants: [],
      feeStatus: [],
      description: "",
    },
  });

  useEffect(() => {
    if (isEdit && id) {
      // 수정 모드일 경우 초기값 불러오기
    }
  }, [id, isEdit]);

  const onSubmit = () => {
    if (isEdit && id) {
      // 수정 api
    } else {
      // 생성 api
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
        <EventFormRow label="행사명" name="title" errors={errors}>
          <Input
            {...register("title", { required: "행사명을 입력해주세요." })}
            placeholder="행사명을 입력하세요"
          />
        </EventFormRow>

        <EventFormRow label="행사 장소" name="location" errors={errors}>
          <Input
            {...register("location", { required: "행사 장소를 입력해주세요." })}
            placeholder="장소를 입력하세요"
          />
        </EventFormRow>

        <EventFormRow label="행사 날짜" name="date" errors={errors}>
          <Input
            {...register("date", { required: "행사 날짜를 입력해주세요." })}
            placeholder="YYYY/MM/DD ~ YYYY/MM/DD"
          />
        </EventFormRow>

        <EventFormRow label="행사 시작 시간" name="time" errors={errors}>
          <Input
            {...register("time", { required: "행사 시간을 입력해주세요" })}
            placeholder="15:00"
            type="time"
          />
        </EventFormRow>

        <EventFormRow label="상품명" name="product" errors={errors}>
          <Input
            {...register("product", { required: "상품명을 입력해주세요." })}
          />
        </EventFormRow>

        <EventFormRow label="상품 수량" name="quantity" errors={errors}>
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

        <EventFormRow label="대상자" name="participants" errors={errors}>
          <Controller
            name="participants"
            control={control}
            rules={{ required: "대상자를 선택해주세요" }}
            render={({ field }) => (
              <SelectButtonGroup
                options={PARTICIPANT_OPTIONS}
                value={field.value}
                onChange={field.onChange}
              />
            )}
          />
        </EventFormRow>

        <EventFormRow label="학생회비 납부" name="feeStatus" errors={errors}>
          <Controller
            name="feeStatus"
            control={control}
            rules={{ required: "학생회비 여부를 선택해주세요." }}
            render={({ field }) => (
              <SelectButtonGroup
                options={FEE_OPTIONS}
                value={field.value}
                onChange={field.onChange}
              />
            )}
          />
        </EventFormRow>

        <EventFormRow label="행사 설명" name="description" errors={errors}>
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
          <a href="/">뒤로가기</a>
        </Button>
        <Button variantType="form-actions" type="submit">
          완료
        </Button>
      </div>
    </form>
  );
}
