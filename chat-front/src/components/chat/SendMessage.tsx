"use client";
import { useContext, useState } from "react";
import { SocketContext } from "./ChatApp";
import { useUser } from "@clerk/nextjs";
import { Message } from "./UIMessages";

const SendMessage = () => {
  const { socket } = useContext(SocketContext);
  const { user } = useUser();
  const [text, setText] = useState("");

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data: Message = {
      sender: user?.username as string,
      content: text,
      timeSent: new Date().toUTCString(),
    };
    socket?.emit("chat-message", { data });
    setText("");
  };
  return (
    <form
      className="flex items-center justify-center py-2  border-gray-300 px-12 w-full"
      onSubmit={onSubmit}
    >
      <div className="join">
        <div>
          <div>
            <input
              className="input input-bordered join-item"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Enter your message..."
            />
          </div>
        </div>
        {/* <select className="select select-bordered join-item">
          <option disabled selected>
            Filter
          </option>
          <option>Sci-fi</option>
          <option>Drama</option>
          <option>Action</option>
        </select> */}
        <div className="indicator">
          <button className="btn join-item" type="submit">
            Send
          </button>
        </div>
      </div>
    </form>
  );
};

export default SendMessage;
