import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@passu/ui/button";
import { PassuLogo } from "@passu/ui/passu-logo";
import { Chip } from "@passu/ui/chip";
import { Divider } from "@passu/ui/divider";

export const Route = createFileRoute("/event/$id/detail")({
  component: EventDetailPage,
});

function EventDetailPage() {
  const { id: _id } = Route.useParams();

  return (
    <div
      className={`
        relative box-border flex size-full flex-col content-stretch items-center
        justify-between bg-[#ffffff] p-0
      `}
      data-name="Layout"
    >
      <div
        className={`
          relative box-border flex min-h-px w-full min-w-px shrink-0 grow
          basis-0 flex-col content-stretch items-start justify-start p-0
        `}
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
                relative box-border flex w-full shrink-0 flex-col
                content-stretch items-start justify-start gap-4 p-0
              `}
            >
              <div
                className={`
                  relative box-border flex w-full shrink-0 flex-col
                  content-stretch items-start justify-start gap-5 p-0
                `}
              >
                <div
                  className={`
                    relative w-[332px] shrink-0 text-left text-[28px]
                    leading-[0] text-[rgba(0,0,0,0.8)] not-italic
                    font-['Pretendard:Bold',_sans-serif]
                  `}
                >
                  <p className="block leading-[normal]">
                    2025-1학기 IT대학 중간고사 간식 행사
                  </p>
                </div>
                <div
                  className={`
                    relative box-border flex w-full shrink-0 flex-col
                    content-stretch items-start justify-start gap-5 p-0
                  `}
                >
                  <div
                    className={`
                      relative box-border flex w-[324px] shrink-0 content-start
                      items-start justify-start gap-2 p-0
                      [flex-flow:wrap]
                    `}
                    data-name="Categories"
                  >
                    <Chip
                      className={`border-[#e0e0e0] bg-neutral-100 text-black/80`}
                    >
                      <div
                        className={`flex w-[134px] items-center justify-between`}
                      >
                        <span>잔여수량</span>
                        <span className="tracking-[-0.28px]">
                          <span className="font-bold">000 </span>
                          <span>/ 0000</span>
                        </span>
                      </div>
                    </Chip>
                    <Chip
                      className={`border-[#e0e0e0] bg-neutral-100 text-black/80`}
                    >
                      학생회비 납부자
                    </Chip>
                    <Chip
                      className={`border-[#e0e0e0] bg-neutral-100 text-black/80`}
                    >
                      융합특성화자유전공학부
                    </Chip>
                    <Chip
                      className={`border-[#e0e0e0] bg-neutral-100 text-black/80`}
                    >
                      재학생
                    </Chip>
                  </div>
                  <div className="relative h-0 w-[344px] shrink-0">
                    <Divider />
                  </div>
                </div>
              </div>
              <div
                className={`
                  relative w-full shrink-0 text-left text-[14px] leading-[0]
                  text-[rgba(0,0,0,0.8)] not-italic
                  font-['Pretendard:Regular',_sans-serif]
                `}
              >
                <p className="block leading-[normal]">
                  안녕하세요! 당신에게 보내는 COMMIT📨
                  <br />
                  제17대 IT대학 학생회입니다!
                  <br />
                  <br />
                  새로운 학기의 시작을 맞아 IT대학 학생회가 여러분을 위한 개강
                  행사를 준비했습니다! 🎉
                  <br />
                  이번 학기에도 소정의 상품 지급과 여러분의 소중한 의견을 듣고,
                  함께 소통할 수 있는 자리를 마련했으니 많은 참여 부탁드립니다!
                  😊
                  <br />
                  <br />✅ EVENT 1 대면 행사
                  <br />
                  <br />
                  🍔 대상: 24-2학기 IT대학 재학생
                  <br />
                  🍔 일시: 9월 4일 (수) 13:00 ~ 16:00
                  <br />
                  🍔 장소: 정보과학관 1층 로비 및 형남공학관 2층 로비
                  <br />
                  🍔 참여방법
                  <br />
                  1. 행사 장소에서 IT대 사업평가를 위해 스티커를 붙여주세요!
                  <br />
                  2. 선착순으로 맘스터치 싸이버거와 음료를 제공해 드립니다!
                  <br />
                  <br />* 선착순 288명을 대상으로 진행되며, 정보과학관과
                  형남공학관에서 각각 144개가 배부됩니다.
                  <br />* 본 행사는 PASSU를 활용하므로, 사전에 총학생회
                  홈페이지에 가입하시면 빠른 상품 수령이 가능합니다.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className={`
          relative h-[88px] w-full shrink-0 cursor-pointer bg-[#0160dd]
        `}
        data-name="Footer_Button"
      >
        <Button
          size="footer"
          className={`
            h-[88px] w-full rounded-none bg-[#0160dd] text-[20px] leading-[28px]
            font-bold text-white
          `}
        >
          참여하기
        </Button>
      </div>
    </div>
  );
}
