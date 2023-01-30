import ChatItem from "./ChatItem";

const ChatRooms = ({ chatrooms }) => {
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
