import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

import styles from '../styles/Main.module.css';

import { useStore } from '../context/Store';
import { TOGGLE_SELECTED_CHAT } from '../context/contstants';
import { request } from '../fetch/requests';
import Send from './Send';
import Message from './Message';
import Close from './Close';
import Loading from './Loading';

export default function Main() {
  const { state, dispatch } = useStore();
  const [chat, setChat] = useState({
    pending: true,
    messages: [],
    name: '',
    users: [],
  });
  const [typing, setTyping] = useState(false);
  const messagesRef = useRef();

  useEffect(() => {
    if (!messagesRef.current) return;

    messagesRef.current.scrollTo({
      left: 0,
      top: messagesRef.current.scrollHeight,
      behavior: "smooth"
     });
     ;
  }, [chat.messages, typing]);

  useEffect(() => {

    if (!state.selectedRoom) return;

    request('/api/chat', {
      method: 'GET',
      headers: {
        'Contect-Type': 'application/json',
        'id': state.selectedRoom,
      },
    }).then(data => {
      if (data.success) {
        setChat({
          pending: false,
          messages: data.chat.messages,
          name: data.chat.name,
          users: data.chat.users,
        });
      }
    });

    state.socket.on('typing-received', () => setTyping(true));
    state.socket.on('typing-ended-reveived', () => setTyping(false));
    state.socket.on('message-received', () => {})
  }, [state.selectedRoom, state.socket]);

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
      <div ref={messagesRef} className={styles.chat_messages}>
        {
          chat.messages.map(message => (
            <Message
              key={message.id ?? Math.random().toString()}
              id={message.id ?? Math.random().toString()}
              username={message.user}
              text={message.text ?? null}
              image={message.image ?? null}
            />
          ))
        }

        {typing && <Loading />}
      </div>
      <Send users={chat.users}  addMessage={(message) => setChat(prev => ({
        ...prev,
        messages: prev.messages.concat(message)
      }))}/>
    </main>
  );
}
