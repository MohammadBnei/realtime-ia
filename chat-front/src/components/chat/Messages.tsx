"use client";
import { useContext, useEffect, useState } from "react";
import { SocketContext } from "./ChatApp";
import UIMessages, { Message } from "./UIMessages";
import { useUser } from "@clerk/nextjs";

const Messages = () => {
  const { socket } = useContext(SocketContext);
  const [messages, setMessages] = useState<Message[]>([]);
  const { user } = useUser();

  useEffect(() => {
    console.log("on");
    const handleMessage = ({ data }: { data: Message }) => {
      setMessages((msg) => [...msg, data]);
    };
    socket?.on("chat-message", handleMessage);
    return () => {
      console.log("off");
      socket?.off("chat-message");
    };
  }, [socket]);
  useEffect(() => {
    console.log({ messages });
  }, [messages]);

  if (messages.length === 0) {
    return <div>No messages yet.</div>;
  }

  return (
    <UIMessages
      messages={messages}
      username={user?.username as string | undefined}
    />
  );
};

export default Messages;
