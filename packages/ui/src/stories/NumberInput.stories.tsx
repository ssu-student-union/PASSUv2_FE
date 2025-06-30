import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";

import { NumberInput } from "@/number-input";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Example/NumberInput",
  component: NumberInput,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    disabled: {
      control: { type: "boolean" },
    },
    min: {
      control: { type: "number" },
    },
    max: {
      control: { type: "number" },
    },
    step: {
      control: { type: "number" },
    },
  },
} satisfies Meta<typeof NumberInput>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
  args: {
    placeholder: "0",
    className: "w-[200px]",
  },
};

export const WithMinMax: Story = {
  args: {
    placeholder: "1-100",
    min: 1,
    max: 100,
    defaultValue: 50,
    className: "w-[200px]",
  },
};

export const WithStep: Story = {
  args: {
    placeholder: "0.5 단위",
    step: 0.5,
    defaultValue: 2.5,
    className: "w-[200px]",
  },
};

export const ProductQuantity: Story = {
  args: {
    placeholder: "수량",
    min: 1,
    max: 999,
    defaultValue: 1,
    className: "w-[150px]",
  },
};

export const Price: Story = {
  args: {
    placeholder: "가격",
    min: 0,
    step: 1000,
    defaultValue: 10000,
    className: "w-[200px]",
  },
};

const ControlledExample = () => {
  const [value, setValue] = useState<number | undefined>(100);

  return (
    <div className="space-y-4">
      <NumberInput
        value={value}
        onValueChange={setValue}
        min={0}
        max={200}
        className="w-[200px]"
        placeholder="제어된 입력"
      />
      <p className="text-sm text-gray-600">현재 값: {value ?? "없음"}</p>
    </div>
  );
};

export const Controlled: Story = {
  render: () => <ControlledExample />,
};

export const Disabled: Story = {
  args: {
    placeholder: "비활성화",
    disabled: true,
    defaultValue: 42,
    className: "w-[200px]",
  },
};

export const WithError: Story = {
  args: {
    placeholder: "오류 상태",
    defaultValue: 999,
    className: "w-[200px] border-red-500 focus-within:ring-red-200",
    "aria-invalid": true,
  },
};

export const Compact: Story = {
  args: {
    placeholder: "0",
    defaultValue: 5,
    className: "w-[120px]",
  },
};

export const Large: Story = {
  args: {
    placeholder: "큰 크기",
    defaultValue: 1000,
    className: "w-[300px] h-12 text-lg",
  },
};

export const KeyboardNavigation: Story = {
  render: () => (
    <div className="space-y-4">
      <p className="text-sm text-gray-600">
        키보드 조작: ↑/↓ 화살표 키로 값 증가/감소
      </p>
      <NumberInput
        placeholder="키보드 테스트"
        defaultValue={10}
        min={0}
        max={100}
        className="w-[200px]"
      />
    </div>
  ),
};
