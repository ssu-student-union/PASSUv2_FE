import type { SidebarListItem } from "@/types/sidebar";
import { Divider } from "@passu/ui/divider";

interface SidebarListSectionProps {
  list?: SidebarListItem[];
}

export const SidebarListSection = ({ list = [] }: SidebarListSectionProps) => {
  return (
    <section className="flex w-full flex-col gap-1.5">
      <div className="txt-h5 text-gray-600">상품수령명단</div>
      <Divider className="text-gray-400" />
      <ul className="gap-1.5 txt-subtitle1 text-gray-600">
        {list.map((item, i) => (
          <li key={i}>
            {item.date} {item.name} {item.code}
          </li>
        ))}
      </ul>
    </section>
  );
};
