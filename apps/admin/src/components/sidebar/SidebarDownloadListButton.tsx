// components/sidebar/common/SidebarDownloadListButton.tsx
import { Download } from "lucide-react";
import SidebarButton from "@/components/sidebar/SidebarButton";

export default function SidebarDownloadListButton() {
  return (
    <SidebarButton variant="outline">
      <Download />
      상품수령명단 다운로드
    </SidebarButton>
  );
}
