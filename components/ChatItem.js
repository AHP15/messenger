import styles from '../styles/ChatItem.module.css';

import { useStore } from '../context/Store';
import { TOGGLE_SELECTED_CHAT, CLEAR_PREV_CHAT } from '../context/contstants';

const ChatItem = ({ id, name, unreadMessages }) => {

  const { dispatch } = useStore();
  const handleClick = () => {
    dispatch({ type: TOGGLE_SELECTED_CHAT, id });
  }
  return (
    <div className={styles.chat_item} onClick={handleClick}>
      <h3>{name}</h3>
      {unreadMessages > 0 && <div className={styles.new_messages}><p>{unreadMessages}</p></div>}
    </div>
  );
}

export default ChatItem;
