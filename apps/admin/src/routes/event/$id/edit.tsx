import { EventFormPage } from "@/components/EventFormPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/event/$id/edit")({
  component: () => <EventFormPage mode="edit" />,
});
