import type { Meta, StoryObj } from "@storybook/react-vite";

import { Progress } from "@/progress";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Example/Progress",
  component: Progress,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    value: {
      control: { type: "range", min: 0, max: 100, step: 1 },
      description: "Progress value (0-100)",
    },
    className: {
      control: { type: "text" },
      description: "Additional CSS classes",
    },
  },
} satisfies Meta<typeof Progress>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
  args: {
    value: 50,
    className: "w-64",
  },
};

export const Empty: Story = {
  args: {
    value: 0,
    className: "w-64",
  },
};

export const Quarter: Story = {
  args: {
    value: 25,
    className: "w-64",
  },
};

export const Half: Story = {
  args: {
    value: 50,
    className: "w-64",
  },
};

export const ThreeQuarters: Story = {
  args: {
    value: 75,
    className: "w-64",
  },
};

export const Complete: Story = {
  args: {
    value: 100,
    className: "w-64",
  },
};

// Different sizes
export const Small: Story = {
  args: {
    value: 60,
    className: "w-32",
  },
};

export const Large: Story = {
  args: {
    value: 60,
    className: "w-96",
  },
};

// Loading state example - matches Figma design
export const Loading: Story = {
  args: {
    value: 65,
    className: "w-[109px]", // Matches Figma width
  },
  render: (args) => (
    <div className="bg-blue-50 p-4 rounded">
      <Progress {...args} />
    </div>
  ),
};

// Multiple progress bars
export const MultipleStates: Story = {
  render: () => (
    <div className="space-y-4 w-64">
      <div>
        <div className="text-sm font-medium mb-2">다운로드 진행률</div>
        <Progress value={33} />
      </div>
      <div>
        <div className="text-sm font-medium mb-2">업로드 진행률</div>
        <Progress value={67} />
      </div>
      <div>
        <div className="text-sm font-medium mb-2">설치 진행률</div>
        <Progress value={90} />
      </div>
    </div>
  ),
};

// With percentage text
export const WithPercentage: Story = {
  args: {
    value: 75,
    className: "w-64",
  },
  render: (args) => (
    <div className="space-y-2">
      <div className="flex justify-between text-sm">
        <span>진행률</span>
        <span>{args.value}%</span>
      </div>
      <Progress {...args} />
    </div>
  ),
};
