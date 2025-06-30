import type { Meta, StoryObj } from "@storybook/react-vite";

import { Input } from "@/input";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Example/Input",
  component: Input,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    type: {
      control: { type: "select" },
      options: ["text", "email", "password", "date", "time", "number"],
    },
    disabled: {
      control: { type: "boolean" },
    },
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
  args: {
    placeholder: "텍스트를 입력하세요",
  },
};

export const EventName: Story = {
  args: {
    placeholder: "행사명을 입력하세요",
    className: "w-[966px]",
  },
};

export const EventLocation: Story = {
  args: {
    placeholder: "행사 장소를 입력하세요",
    className: "w-[966px]",
  },
};

export const DateInput: Story = {
  args: {
    type: "date",
    placeholder: "YYYY/MM/DD",
    className: "w-[966px]",
  },
};

export const DateRangeInput: Story = {
  args: {
    placeholder: "YYYY/MM/DD ~ YYYY/MM/DD",
    className: "w-[966px]",
  },
};

export const TimeInput: Story = {
  args: {
    type: "time",
    placeholder: "15:00",
    className: "w-[966px]",
  },
};

export const ProductName: Story = {
  args: {
    placeholder: "상품명을 입력하세요",
    className: "w-[966px]",
  },
};

export const ProductQuantity: Story = {
  args: {
    type: "number",
    placeholder: "수량을 입력하세요",
    className: "w-[966px]",
  },
};

export const EventDescription: Story = {
  args: {
    placeholder: "행사 설명을 입력하세요",
    className: "w-[966px]",
  },
};

export const WithValue: Story = {
  args: {
    value: "입력된 텍스트",
    className: "w-[966px]",
  },
};

export const Focused: Story = {
  args: {
    placeholder: "포커스된 상태",
    className: "w-[966px]",
    autoFocus: true,
  },
};

export const Disabled: Story = {
  args: {
    placeholder: "비활성화된 입력",
    disabled: true,
    className: "w-[966px]",
  },
};

export const WithError: Story = {
  args: {
    placeholder: "오류 상태의 입력",
    className: "w-[966px]",
    "aria-invalid": true,
  },
};

export const Email: Story = {
  args: {
    type: "email",
    placeholder: "이메일을 입력하세요",
    className: "w-[966px]",
  },
};

export const Password: Story = {
  args: {
    type: "password",
    placeholder: "비밀번호를 입력하세요",
    className: "w-[966px]",
  },
};
