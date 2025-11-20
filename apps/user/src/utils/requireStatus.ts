import { EventRequireStatus } from "@/model/api";

export const getRequireStatuses = (status: number): EventRequireStatus[] => {
  const requireStatuses: EventRequireStatus[] = [];
  if (status & EventRequireStatus.ATTENDED) {
    requireStatuses.push(EventRequireStatus.ATTENDED);
  }
  if (status & EventRequireStatus.ON_LEAVE) {
    requireStatuses.push(EventRequireStatus.ON_LEAVE);
  }
  if (status & EventRequireStatus.GRADUATED) {
    requireStatuses.push(EventRequireStatus.GRADUATED);
  }
  return requireStatuses;
};
