import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

import styles from '../styles/Send.module.css';
import { useStore } from '../context/Store';

const Send = ({ users, addMessage }) => {
  const [message, setMessage] = useState('');
  const inputRef = useRef();
  const { dispatch, state } = useStore();
  const { socket, selectedRoom, user } = state;

  const handleChange = (e) => {
    socket.emit('typing', {
      chatId: selectedRoom,
      users,
    });
    setMessage(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      user: user.name,
      text: message,
      image: null,
    };
    socket.emit('message', {
      chatId: selectedRoom,
      users,
      message: data,
    });
    addMessage(data);
    setMessage('');
  };

  useEffect(() => {
    const handleFocus = (e) => {
      socket.emit('typing-ended', {
        chatId: selectedRoom,
        users,
      });
    }
    const input = inputRef.current;
    inputRef.current.addEventListener('focusout', handleFocus);

    return () => {
      input.removeEventListener('focusout', handleFocus);
    }
  }, []);

  return (
    <form className={styles.chat_form} onSubmit={handleSubmit}>
      <div className={styles.text}>
        <label htmlFor="message" hidden>Type your message</label>
        <input
          type="text"
          id="message"
          placeholder="Type your message"
          value={message}
          onChange={handleChange}
          ref={inputRef}
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
