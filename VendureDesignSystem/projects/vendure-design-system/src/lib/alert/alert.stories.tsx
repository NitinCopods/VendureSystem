import { moduleMetadata, type Meta, type StoryObj } from "@storybook/angular";
import { AlertComponent } from "./alert.component";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta: Meta<AlertComponent> = {
  title: "Components/Alert",
  component: AlertComponent,
  tags: ["autodocs"],
  argTypes: {
    title: {
      control: {
        type: "text",
      },
    },
    type: {
      control: {
        type: "select",
      },
      options: ["info", "success", "warning", "error"],
    },
    action: {
      control: {
        type: "text",
      },
    },
  },
};

export default meta;
type Story = StoryObj<AlertComponent>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args

// Default Alert
export const Default: Story = {
  args: {
    title:
      "LMN template for this payer and speciality is available, download the template and re-upload the signed letter",
  },
};

// Info Alert
export const Info: Story = {
  args: {
    title:
      "LMN template for this payer and speciality is available, download the template and re-upload the signed letter",
    type: "info",
  },
};

// Success Alert
export const Success: Story = {
  args: {
    title:
      "LMN template for this payer and speciality is available, download the template and re-upload the signed letter",
    type: "success",
  },
};

// Warning Alert
export const Warning: Story = {
  args: {
    title:
      "LMN template for this payer and speciality is available, download the template and re-upload the signed letter",
    type: "warning",
  },
};

// Error Alert
export const Error: Story = {
  args: {
    title:
      "LMN template for this payer and speciality is available, download the template and re-upload the signed letter",
    type: "error",
  },
};

// Dismissible Alert
export const Dismissible: Story = {
  args: {
    title:
      "LMN template for this payer and speciality is available, download the template and re-upload the signed letter",
    dismissible: true,
  },
};

// With children Alert
export const WithChild: Story = {
  args: {
    title:
      "LMN template for this payer and speciality is available, download the template and re-upload the signed letter",
    dismissible: true,
  },
  render: (args) => ({
    props: args,
    template: `
      <lib-alert type="info" title="No medical code found" dismissible="true">
        <div>External body</div>
      </lib-alert>
    `,
  }),
};
