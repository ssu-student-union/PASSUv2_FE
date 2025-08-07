import { useEffect, useState } from "react";

export const useTimer = (isActive: boolean) => {
  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    if (!isActive) return;

    const interval = setInterval(() => {
      setElapsedTime((prevTime) => prevTime + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [isActive]);

  return elapsedTime;
};
