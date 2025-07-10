import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/event/create")({
  component: CreatePage,
});

function CreatePage() {
  return <div>create</div>;
}
