import { useEffect, useState } from 'react';
import Image from 'next/image';

import styles from '../styles/Main.module.css';

import { useStore } from '../context/Store';
import { TOGGLE_SELECTED_CHAT } from '../context/contstants';
import Send from './Send';
import Message from './Message';
import Close from './Close';

export default function Main() {
  const { state, dispatch } = useStore();
  const [chat, setChat] = useState({
    pending: true,
    messages: [],
    name: '',
  });

  useEffect(() => {
    const fetchChat = async () => {
      return [
        {
          id: '1',
          user: "user name",
          image: "/favicon.ico",
        },
        {
          id: '2',
          user: "user name1",
          text: "message text message text message text",
        },
        {
          id: '3',
          user: "user name",
          image: "/favicon.ico",
        },
        {
          id: '4',
          user: "user name1",
          text: "message text message text message text",
        },
        {
          id: '5',
          user: "user name",
          text: "message text message text message text",
        },
        {
          id: '6',
          user: "user name",
          text: "message text message text message text",
        },
        {
          id: '8',
          user: "user name1",
          image: "/favicon.ico",
        },
        {
          id: '7',
          user: "user name1",
          text: "message text message text message text",
        },
      ];
    }
    fetchChat().then(messages => setChat(
      { messages, name: 'chat name', pending: false }
    ));
  }, []);

  if (chat.pending) {
    return (
      <div className={styles[state.selectedRoom ? 'opened_load' : 'load' ]}>
        <div>
          <Image
            src="/loading.gif"
            width="70"
            height="70"
            alt="loading"
          />
        </div>
      </div>
    );
  }
  return (
    <main className={styles[state.selectedRoom ? 'opened_chat' : 'chat' ]}>
      <Close close={() => dispatch({ type: TOGGLE_SELECTED_CHAT, id: null })} />

      <h2 className={styles.chat_name}>{chat.name}</h2>
      <div className={styles.chat_messages}>
        {
          chat.messages.map(message => (
            <Message
              key={message.id}
              id={message.id}
              username={message.user}
              text={message.text ?? null}
              image={message.image ?? null}
            />
          ))
        }
      </div>
      <Send />
    </main>
  );
}
