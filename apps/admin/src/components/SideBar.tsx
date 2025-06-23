import { PassuLogo } from "@passu/ui/passu-logo";

export default function SideBar() {
  return (
    <aside className={`flex h-screen w-104 flex-col items-center gap-16 pt-28`}>
      <PassuLogo className={`h-16 w-auto`} />
    </aside>
  );
}
