import { EventFormPage } from "@/components/EventFormPage";
import { authGuard } from "@/lib/authGuard";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/event/$id/edit")({
  beforeLoad: authGuard,
  component: () => <EventFormPage mode="edit" />,
});
