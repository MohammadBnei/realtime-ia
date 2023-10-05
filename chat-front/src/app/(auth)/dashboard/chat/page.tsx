import ChatApp from "@/components/chat/ChatApp";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Chat",
  description: "A simple chat app",
};

const Chat = () => {
  return (
    <div className="px-12 py-2">
      <ChatApp />
    </div>
  );
};

export default Chat;
