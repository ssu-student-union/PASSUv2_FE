import { EventStatus } from "@/types/event";
import type { JSX } from "react";

export const eventStatusMessages: Record<EventStatus, JSX.Element> = {
  [EventStatus.NotStarted]: (
    <>
      행사 시작 버튼을 누르면 <br />
      인증번호 입력창이 활성화됩니다.
    </>
  ),
  [EventStatus.Ongoing]: <>인증번호를 입력해주세요.</>,
  [EventStatus.Paused]: (
    <>
      행사 재개 버튼을 누르면 <br />
      인증번호 입력창이 활성화됩니다.
    </>
  ),
  [EventStatus.Finished]: <>행사가 종료되었습니다.</>,
};
