import type { Meta, StoryObj } from "@storybook/react-vite";

import { Chip } from "@/chip";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Example/Chip",
  component: Chip,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["default", "secondary", "destructive", "outline"],
    },
  },
} satisfies Meta<typeof Chip>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
  args: {
    variant: "default",
    children: "융합특성화자유전공학부",
  },
};

export const Secondary: Story = {
  args: {
    variant: "secondary",
    children: "컴퓨터공학과",
  },
};

export const Destructive: Story = {
  args: {
    variant: "destructive",
    children: "삭제",
  },
};

export const Outline: Story = {
  args: {
    variant: "outline",
    children: "선택됨",
  },
};

export const WithIcon: Story = {
  args: {
    variant: "default",
    children: (
      <>
        <svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M6 1L7.545 4.13L11 4.635L8.5 7.07L9.09 10.5L6 8.885L2.91 10.5L3.5 7.07L1 4.635L4.455 4.13L6 1Z"
            fill="currentColor"
          />
        </svg>
        인기
      </>
    ),
  },
};

export const LongText: Story = {
  args: {
    variant: "default",
    children: "매우 긴 텍스트가 들어간 칩 컴포넌트 예시",
  },
};

export const AsLink: Story = {
  args: {
    variant: "default",
    asChild: true,
    children: (
      <a href="#" onClick={(e) => e.preventDefault()}>
        클릭 가능한 칩
      </a>
    ),
  },
};
