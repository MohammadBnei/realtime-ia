import { useContext, useEffect } from "react";
import { SocketContext } from "./ChatApp";
import Messages from "./Messages";

interface Props {
  roomName: string;
}
const Room = ({ roomName }: Props) => {
  const { socket } = useContext(SocketContext);
  useEffect(() => {
    if (roomName) {
      socket?.emit("join-room", roomName);
    }
    return () => {
      if (roomName) {
        socket?.emit("leave-room", roomName);
      }
    };
  }, [roomName, socket]);

  return <Messages />;
};

export default Room;
