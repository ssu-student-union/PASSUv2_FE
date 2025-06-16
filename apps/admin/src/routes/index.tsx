import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@passu/ui/button";
import { PassuLogo } from "@passu/ui/passu-logo";

export const Route = createFileRoute("/")({
  component: App,
});

function App() {
  return (
    <div className="text-center">
      <header
        className={`
          flex min-h-screen flex-col items-center justify-center bg-[#282c34]
          text-[calc(10px+2vmin)] text-white
        `}
      >
        <PassuLogo />
        <p className="mb-4">Welcome to Passu Admin!</p>
        <Button>Button</Button>
      </header>
    </div>
  );
}
