import Image from 'next/image';
import { useStore } from '../context/Store';

import styles from '../styles/Message.module.css';

const Message = ({ id, username, text, image }) => {
  const { state } = useStore();
  const userMessage = username === state.user.name;
  return (
    <div className={styles[userMessage ? 'user_message' : 'message']}>
      <p className={styles[userMessage ? 'user_name' : 'name']}>{username}</p>
      {text && <p className={styles[userMessage ? 'user_text' : 'text']}>{text}</p>}
      {image && 
        <div className={styles[userMessage ? 'user_image' : 'image']}>
          <Image
            src={image}
            alt={image}
            width="150"
            height="200"
          />
        </div>
      }
    </div>
  );
}

export default Message;