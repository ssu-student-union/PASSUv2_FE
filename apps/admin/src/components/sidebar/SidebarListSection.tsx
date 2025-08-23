import type { EnrollmentListData } from "@/types/event.api";
import { Divider } from "@passu/ui/divider";
import dayjs from "dayjs";

interface SidebarListSectionProps {
  list?: EnrollmentListData[];
}

export const SidebarListSection = ({ list = [] }: SidebarListSectionProps) => {
  return (
    <section className="flex w-full flex-col gap-1.5">
      <div className="txt-h5 text-gray-600">상품수령명단</div>
      <Divider className="text-gray-400" />
      <ul className="gap-1.5 txt-subtitle1 text-gray-600">
        {list.map((item, i) => (
          <li key={i} className="flex gap-3">
            <span> {dayjs(item.timestamp).format("YYYY.MM.DD HH:mm:ss")}</span>
            <span>{item.studentName}</span>
            <span>{item.randomKey}</span>
          </li>
        ))}
      </ul>
    </section>
  );
};
