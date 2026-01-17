export const AUDITOR_NAME = "중앙감사위원회" as const;

export const isAuditorName = (name?: string | null) =>
  (name ?? "").trim() === AUDITOR_NAME;
