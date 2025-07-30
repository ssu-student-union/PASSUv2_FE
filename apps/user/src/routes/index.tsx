import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@passu/ui/button";
import { PassuLogo } from "@passu/ui/passu-logo";

export const Route = createFileRoute("/")({
  component: App,
});

function App() {
  return (
    <div
      className={`
        flex min-h-screen flex-col items-center justify-center bg-gray-800
        text-white
      `}
    >
      <PassuLogo />
      <p className="mb-4 txt-h3">Welcome to Passu User!</p>
      <Button>Button</Button>
    </div>
  );
}
