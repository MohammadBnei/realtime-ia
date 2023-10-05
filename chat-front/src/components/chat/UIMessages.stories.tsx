import type { Meta, StoryObj } from "@storybook/react";

import UIMessages from "./UIMessages";

// More on how to set up stories at: https://storybook.js.org/docs/7.0/react/writing-stories/introduction
const meta = {
  title: "Chat/UIMessages",
  component: UIMessages,
  tags: ["autodocs"],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/7.0/react/configure/story-layout
    layout: "fullscreen",
  },
} satisfies Meta<typeof UIMessages>;

export default meta;
type Story = StoryObj<typeof UIMessages>;

export const UIMessagesWithSomeMessages = {
  args: {
    messages: [
      {
        sender: "mohammad",
        content: "Hello World",
        timeSent: new Date("2022-01-01").toLocaleDateString(),
      },
      {
        sender: "mohammad",
        content: "How are you?",
        timeSent: new Date("2022-02-01").toLocaleDateString(),
      },
      {
        sender: "mohammad",
        content: "Great work!",
        timeSent: new Date("2022-03-01").toLocaleDateString(),
      },
      {
        sender: "alice",
        content: "Hello Mohammad",
        timeSent: new Date("2022-01-05").toLocaleDateString(),
      },
      {
        sender: "bob",
        content: "Any update?",
        timeSent: new Date("2022-02-15").toLocaleDateString(),
      },
      {
        sender: "alice",
        content: "Looking good",
        timeSent: new Date("2022-03-10").toLocaleDateString(),
      },
      {
        sender: "charlie",
        content: "Keep it up!",
        timeSent: new Date("2022-04-01").toLocaleDateString(),
      },
      {
        sender: "bob",
        content: "Nice progress",
        timeSent: new Date("2022-04-20").toLocaleDateString(),
      },
      {
        sender: "alice",
        content: "Almost there",
        timeSent: new Date("2022-05-01").toLocaleDateString(),
      },
      {
        sender: "charlie",
        content: "Well done",
        timeSent: new Date("2022-05-20").toLocaleDateString(),
      },
      {
        sender: "bob",
        content: "Moving forward",
        timeSent: new Date("2022-06-01").toLocaleDateString(),
      },
      {
        sender: "charlie",
        content: "Last stretch!",
        timeSent: new Date("2022-06-20").toLocaleDateString(),
      },
    ],
    username: "mohammad",
  },
} satisfies Story;
