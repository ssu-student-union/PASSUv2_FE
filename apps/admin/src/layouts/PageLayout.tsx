import type { ReactNode } from "react";

interface PageLayoutProps {
  children: ReactNode;
}

export const PageLayout = ({ children }: PageLayoutProps) => {
  return (
    <div className="flex h-full">
      <main className="flex w-full">{children}</main>
    </div>
  );
};
