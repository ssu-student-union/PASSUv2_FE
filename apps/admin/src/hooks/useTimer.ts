import { useEffect, useState } from "react";

export const useTimer = (startTime: Date | null, isActive: boolean) => {
  const [now, setNow] = useState<Date>(new Date());

  useEffect(() => {
    if (!isActive || !startTime) return;

    const interval = setInterval(() => {
      setNow(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, [isActive, startTime]);

  if (!startTime) return 0;
  const deltaInSeconds = Math.floor(
    (now.getTime() - startTime.getTime()) / 1000,
  );

  return deltaInSeconds;
};
