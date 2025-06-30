import type { Meta, StoryObj } from "@storybook/react-vite";

import {
  Modal,
  ModalContent,
  ModalDescription,
  ModalFooter,
  ModalHeader,
  ModalTitle,
  ModalTrigger,
} from "@/modal";
import { Button } from "@/button";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Example/Modal",
  component: Modal,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    open: {
      control: { type: "boolean" },
      description: "Controls whether the modal is open",
    },
  },
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

// Student Information Modal - matches the Figma design
export const StudentInfoConfirmation: Story = {
  args: {
    defaultOpen: true,
  },
  render: (args) => (
    <Modal {...args}>
      <ModalTrigger asChild>
        <Button>본인 정보 확인</Button>
      </ModalTrigger>
      <ModalContent
        className="min-w-[300px] max-w-[400px]"
        showCloseButton={false}
      >
        <ModalHeader className="text-left">
          <ModalTitle className="text-xl font-bold text-gray-900">
            본인 정보 확인
          </ModalTitle>
          <ModalDescription className="text-sm text-gray-900">
            정보가 잘못되었나요?
          </ModalDescription>
        </ModalHeader>

        {/* Student Information Content */}
        <div className="py-6">
          <div className="flex gap-12">
            {/* Labels */}
            <div className="flex flex-col gap-4 text-gray-900 font-bold text-base">
              <div>이름</div>
              <div>학번</div>
              <div>학과/부</div>
            </div>

            {/* Values */}
            <div className="flex flex-col gap-4 text-gray-900 text-base flex-1">
              <div>장우영</div>
              <div>20211608</div>
              <div>글로벌미디어학부</div>
            </div>
          </div>
        </div>

        <ModalFooter className="flex-row gap-2 justify-stretch">
          <Button variant="outline" className="flex-1">
            취소
          </Button>
          <Button className="flex-1">로그인</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  ),
};

// Basic Modal Example
export const Basic: Story = {
  render: () => (
    <Modal>
      <ModalTrigger asChild>
        <Button>모달 열기</Button>
      </ModalTrigger>
      <ModalContent>
        <ModalHeader>
          <ModalTitle>기본 모달</ModalTitle>
          <ModalDescription>이것은 기본 모달 예시입니다.</ModalDescription>
        </ModalHeader>
        <div className="py-4">
          <p>모달 내용이 여기에 들어갑니다.</p>
        </div>
        <ModalFooter>
          <Button variant="outline">취소</Button>
          <Button>확인</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  ),
};

// Modal with Form
export const WithForm: Story = {
  render: () => (
    <Modal>
      <ModalTrigger asChild>
        <Button>폼 모달 열기</Button>
      </ModalTrigger>
      <ModalContent>
        <ModalHeader>
          <ModalTitle>사용자 정보 입력</ModalTitle>
          <ModalDescription>아래 정보를 입력해주세요.</ModalDescription>
        </ModalHeader>
        <div className="py-4 space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">이름</label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="이름을 입력하세요"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">이메일</label>
            <input
              type="email"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="이메일을 입력하세요"
            />
          </div>
        </div>
        <ModalFooter>
          <Button variant="outline">취소</Button>
          <Button>저장</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  ),
};

// Confirmation Modal
export const Confirmation: Story = {
  render: () => (
    <Modal>
      <ModalTrigger asChild>
        <Button variant="destructive">삭제</Button>
      </ModalTrigger>
      <ModalContent>
        <ModalHeader>
          <ModalTitle>삭제 확인</ModalTitle>
          <ModalDescription>
            정말로 이 항목을 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.
          </ModalDescription>
        </ModalHeader>
        <ModalFooter>
          <Button variant="outline">취소</Button>
          <Button variant="destructive">삭제</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  ),
};

// Modal without Close Button
export const WithoutCloseButton: Story = {
  render: () => (
    <Modal>
      <ModalTrigger asChild>
        <Button>닫기 버튼 없는 모달</Button>
      </ModalTrigger>
      <ModalContent showCloseButton={false}>
        <ModalHeader>
          <ModalTitle>중요한 알림</ModalTitle>
          <ModalDescription>
            이 모달은 닫기 버튼이 없습니다. 하단의 버튼을 사용해주세요.
          </ModalDescription>
        </ModalHeader>
        <div className="py-4">
          <p>중요한 내용이 여기에 표시됩니다.</p>
        </div>
        <ModalFooter>
          <Button className="w-full">확인</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  ),
};
