import { Button } from "@passu/ui/button";
import { type ComponentProps } from "react";

type SidebarButtonProps = Omit<
  ComponentProps<typeof Button>,
  "variantType" | "size"
>;

export const SidebarButton = ({ ...props }: SidebarButtonProps) => {
  return <Button variantType="sidebar" {...props} />;
};
