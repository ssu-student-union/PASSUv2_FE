import { useForm } from "react-hook-form";
import { useCreateEvent, useUpdateEvent, useEventDetail } from "@/api/event";
import { useParams, useNavigate } from "@tanstack/react-router";
import dayjs from "dayjs";
import { useEffect } from "react";
import {
  FEE_OPTIONS,
  PARTICIPANT_OPTIONS,
  type EventFormValues,
} from "@/types/event";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

export function useEventForm(mode: "create" | "edit") {
  const { id } = useParams({ strict: false });
  const navigate = useNavigate();
  const isEdit = mode === "edit";

  const form = useForm<EventFormValues>({
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

  const { reset } = form;

  const { data: eventDetail } = useEventDetail(Number(id), {
    enabled: isEdit && !!id,
  });

  const toISO = (date: string, time: string) =>
    dayjs(`${date}T${time}`).toISOString();

  useEffect(() => {
    if (isEdit && eventDetail) {
      const start = dayjs.utc(eventDetail.startTime).tz("Asia/Seoul");
      const end = dayjs.utc(eventDetail.endTime).tz("Asia/Seoul");

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

  const { mutate: createEvent } = useCreateEvent({
    onSuccess: () => navigate({ to: "/" }),
    onError: (error) => {
      console.error("생성 실패:", error);
    },
  });

  const { mutate: updateEvent } = useUpdateEvent({
    onSuccess: () => navigate({ to: "/" }),
  });

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

  return {
    form,
    onSubmit,
    isEdit,
  };
}
