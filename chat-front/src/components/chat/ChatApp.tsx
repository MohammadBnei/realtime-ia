"use client";

import { useUser } from "@clerk/nextjs";
import { createContext, useEffect, useState } from "react";
import { Socket, io } from "socket.io-client";
import SendMessage from "./SendMessage";
import Room from "./Room";

export const SocketContext: React.Context<{
  socket?: Socket;
  setSocket?: (s: Socket) => void;
}> = createContext({});

const ChatApp = () => {
  const [socket, setSocket] = useState<Socket>();
  const { user } = useUser();

  useEffect(() => {
    const _socket = io(
      process.env.NEXT_PUBLIC_CHAT_API_URL || "http://localhost:4000"
    );
    setSocket(_socket);
    _socket.on("connect", () => {
      console.log("connected");
    });
    return () => {
      _socket?.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={{ socket, setSocket }}>
      <h1>Chat App</h1>
      <h2>Username : {user?.username}</h2>
      <div className="flex flex-col grow">
        <div className="h-96 overflow-y-scroll">
          <Room roomName="" />
        </div>
        <SendMessage />
      </div>
    </SocketContext.Provider>
  );
};

export default ChatApp;
