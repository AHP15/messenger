import { useState } from 'react';
import Image from 'next/image';

import styles from '../styles/Send.module.css';
import { useStore } from '../context/Store';

const Send = ({ users }) => {
  const [message, setMessage] = useState('');
  const { state } = useStore();
  const { socket, selectedRoom } = state;

  const handleChange = (e) => {
    socket.emit('typing', {
      chatId: selectedRoom,
      users,
    });
    setMessage(e.target.value);
  }

  return (
    <form className={styles.chat_form}>
      <div className={styles.text}>
        <label htmlFor="message" hidden>Type your message</label>
        <input
          type="text"
          id="message"
          placeholder="Type your message"
          value={message}
          onChange={handleChange}
        />
      </div>
      <div className={styles.image}>
        <label htmlFor="image" hidden>Send image</label>
        <input
          type="file"
          id="image"
        />
      </div>

      <Image
        src="/favicon.ico"
        width="45"
        height="45"
        alt="Send image"
        className={styles.send_image}
      />
    </form>
  );
};
export default Send;
