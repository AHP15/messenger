import { useEffect } from "react";
import ChatItem from "./ChatItem";
import { ADD_UNREAD_MESSAGE } from '../context/contstants';
import { useStore } from "../context/Store";

const ChatRooms = ({ chatrooms }) => {
  const { dispatch, state } = useStore();
  const { socket } = state;

  useEffect(() => {
    if (!socket) return;
    socket.on('message-received', ({ chatId }) => {
      dispatch({ type: ADD_UNREAD_MESSAGE, id: chatId })
    });
  }, [socket, dispatch]);

  return (
    <div className="items">
      {
        chatrooms.map(chat => (
          <ChatItem
            key={chat.id ?? chat._id}
            id={chat.id ?? chat._id}
            name={chat.name}
            unreadMessages={chat.unreadMessages}
          />
        ))
      }
    </div>
  );
};
export default ChatRooms;
