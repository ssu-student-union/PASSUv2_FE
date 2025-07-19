import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@passu/ui/button";
import { PassuLogo } from "@passu/ui/passu-logo";

export const Route = createFileRoute("/event/$id/enrolled")({
  component: EventEnrolledPage,
});

// Import local party popper emoji asset
import partyPopperSvg from "@/assets/party-popper.svg";

function EventEnrolledPage() {
  const { id: _id } = Route.useParams();

  return (
    <div
      className={`
        relative box-border flex size-full flex-col content-stretch items-center
        justify-between p-0
      `}
      data-name="View"
    >
      <div
        className="relative min-h-px w-full min-w-px shrink-0 grow basis-0"
        data-name="Content"
      >
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
                gap-7 p-0
              `}
              data-name="Inner Center Content"
            >
              <div
                className="relative size-36 shrink-0 overflow-clip"
                data-name="fluent-emoji:party-popper"
              >
                <div
                  className={`
                    absolute top-[6.505%] right-[8.989%] bottom-[6.375%]
                    left-[8.043%]
                  `}
                  data-name="Group"
                >
                  <img
                    alt="Party popper emoji"
                    className="block size-full max-w-none"
                    src={partyPopperSvg}
                  />
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
                <p className="block leading-[normal]">상품을 수령해주세요!</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Button
        size="footer"
        className={`h-24 w-full cursor-pointer font-bold text-white`}
      >
        설문조사 참여하기
      </Button>
    </div>
  );
}
