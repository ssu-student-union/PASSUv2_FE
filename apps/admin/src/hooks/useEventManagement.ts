import { useCallback, useState } from "react";
import { EventStatus } from "@/types/event";

const AUTH_CODE_LENGTH = 4;

export const useEventManagement = () => {
  const [status, setStatus] = useState<EventStatus>(EventStatus.NotStarted);
  const [participantCount, setParticipantCount] = useState(0);
  const [inputValue, setInputValue] = useState("");

  const startEvent = useCallback(() => setStatus(EventStatus.Ongoing), []);
  const pauseEvent = useCallback(() => setStatus(EventStatus.Paused), []);
  const finishEvent = useCallback(() => setStatus(EventStatus.Finished), []);
  const resumeEvent = useCallback(() => setStatus(EventStatus.Ongoing), []);

  const handleAuthentication = useCallback(() => {
    // api 호출 로직
    if (inputValue.length === AUTH_CODE_LENGTH) {
      setParticipantCount((prevCount) => prevCount + 1);
      setInputValue("");
      console.log(`인증 성공: ${inputValue}`);
    }
  }, [inputValue]);

  const handleInputChange = useCallback((value: string) => {
    if (/^\d*$/.test(value)) {
      setInputValue(value);
    }
  }, []);

  return {
    status,
    participantCount,
    inputValue,
    startEvent,
    pauseEvent,
    finishEvent,
    resumeEvent,
    handleAuthentication,
    handleInputChange,
  };
};
