import { EventFormPage } from "@/components/EventFormPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/event/edit/$id")({
  component: () => <EventFormPage mode="edit" />,
});
