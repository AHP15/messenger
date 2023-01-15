import styles from '../styles/ChatItem.module.css';

import { useStore } from '../context/Store';
import { TOGGLE_SELECTED_CHAT } from '../context/contstants';

const ChatItem = ({ id, name, unreadMessages }) => {

  const { dispatch } = useStore();
  return (
    <div className={styles.chat_item} onClick={() => dispatch({ type: TOGGLE_SELECTED_CHAT, id })}>
      <h3>{name}</h3>
      {unreadMessages > 0 && <div className={styles.new_messages}><p>{unreadMessages}</p></div>}
    </div>
  );
}

export default ChatItem;
