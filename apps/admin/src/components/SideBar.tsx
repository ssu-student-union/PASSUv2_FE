import { PassuLogo } from "@passu/ui/passu-logo";

export default function SideBar() {
  return (
    <aside
      className={`
        flex h-screen w-82 flex-col items-center gap-16 pt-28
        2xl:w-104
      `}
    >
      <PassuLogo
        className={`
          h-12 w-auto
          2xl:h-16
        `}
      />
    </aside>
  );
}
