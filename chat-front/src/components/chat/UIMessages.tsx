import { useEffect, useRef } from "react";

export interface Props {
  messages: Message[];
  username?: string;
}

export interface Message {
  sender: string;
  content: string;
  timeSent: string;
}
const UIMessages = ({ messages, username }: Props) => {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef?.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="card w-full h-full  shadow-xl">
      <div className="card-body w-full overflow-y-scroll">
        {messages
          .filter((m) => !!m)
          .map((message, i) => (
            <div
              className={`chat ${
                message.sender === username ? "chat-end" : "chat-start"
              } `}
              key={message.timeSent}
            >
              {message.sender !== username && <div className="chat-header">{message.sender}</div>}
              <div
                className={`chat-bubble ${
                  message.sender === username
                    ? "chat-bubble-primary"
                    : "chat-bubble-secondary"
                }`}
              >
                {message.content}
              </div>
              {i === messages.length - 1 && <div className="chat-footer opacity-50">
                <time>{message.timeSent || 'No date'}</time>
              </div>}
            </div>
          ))}
        <div ref={bottomRef} />
      </div>
    </div>
  );
};

export default UIMessages;
