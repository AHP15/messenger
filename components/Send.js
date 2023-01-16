import { useState } from 'react';
import Image from 'next/image';

import styles from '../styles/Send.module.css';

const Send = () => {
  const [message, setMessage] = useState('');

  return (
    <form className={styles.chat_form}>
      <div className={styles.text}>
        <label htmlFor="message" hidden>Type your message</label>
        <input
          type="text"
          id="message"
          placeholder="Type your message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
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
