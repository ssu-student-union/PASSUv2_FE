import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@passu/ui/button";
import { PassuLogo } from "@passu/ui/passu-logo";

export const Route = createFileRoute("/")({
  component: App,
});

function App() {
  return (
    <div className={`flex min-h-screen flex-col items-center justify-center`}>
      <PassuLogo />
      <p className="mb-4 txt-h3">Welcome to Passu User!</p>
      <Button asChild>
        <Link to="/event/$id" params={{ id: "1" }}>
          To Event 1
        </Link>
      </Button>
    </div>
  );
}
