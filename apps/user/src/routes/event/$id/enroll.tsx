import { createFileRoute } from "@tanstack/react-router";
import { PassuLogo } from "@passu/ui/passu-logo";

export const Route = createFileRoute("/event/$id/enroll")({
  component: EventEnrollPage,
});

function EventEnrollPage() {
  const { id: _id } = Route.useParams();

  return (
    <div className="relative size-full" data-name="View">
      <div className="relative size-full">
        <div
          className={`
            relative box-border flex size-full flex-col content-stretch
            items-start justify-start gap-4 px-6 pt-4 pb-0
          `}
        >
          <div
            className="relative h-[21px] w-[100px] shrink-0"
            data-name="PASSU logo"
          >
            <PassuLogo />
          </div>
          <div
            className={`
              relative box-border flex min-h-px w-full min-w-px shrink-0 grow
              basis-0 flex-col content-stretch items-center justify-center
              gap-[34px] p-0
            `}
            data-name="Content"
          >
            <div
              className={`
                relative box-border flex w-full shrink-0 flex-col
                content-stretch items-center justify-center gap-[34px] px-0 pt-0
                pb-[120px]
              `}
              data-name="Inner Center"
            >
              <div
                className={`
                  relative box-border flex shrink-0 flex-col content-stretch
                  items-center justify-start p-0
                `}
              >
                <div
                  className={`
                    relative w-full shrink-0 text-center text-[96px] leading-[0]
                    tracking-[-1.92px] text-[#000000] not-italic
                    font-['Pretendard:Bold',_sans-serif]
                  `}
                >
                  <p className="block leading-[normal]">2321</p>
                </div>
                <div className="relative h-0 w-full shrink-0">
                  <div
                    className={`
                      absolute top-[-1px] right-[-0.459%] bottom-[-1px]
                      left-[-0.459%]
                    `}
                  >
                    <svg
                      width="100%"
                      height="2"
                      viewBox="0 0 218 2"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="block size-full max-w-none"
                    >
                      <path d="M0 1H218" stroke="#e0e0e0" strokeWidth="2" />
                    </svg>
                  </div>
                </div>
              </div>
              <div
                className={`
                  relative min-w-full shrink-0 text-center text-[24px]
                  leading-[0] text-[rgba(0,0,0,0.8)] not-italic
                  font-['Pretendard:Regular',_sans-serif]
                `}
                style={{ width: "min-content" }}
              >
                <p className="block leading-[normal]">
                  화면을 학생회에게 보여주세요.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
