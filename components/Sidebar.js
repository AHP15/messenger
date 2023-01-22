import { useState } from "react";
import ChatRooms from "./ChatRooms";
import Contacts from "./Contacts";

import styles from '../styles/Sidebar.module.css';
import { useStore } from "../context/Store";
import {
  OPEN_MODEL
} from "../context/contstants";

export default function Sidebar() {
  const {state, dispatch} = useStore();
  const [show, setShow] = useState('Chatrooms');

  const handleNewClick = () => {
    dispatch({ type: OPEN_MODEL, payload: show });
  };
  return (
    <aside className={styles.sidebar}>
      <div className={styles.btn_container}>
        <button 
          className={styles[`${show === 'Chatrooms' ? 'clicked' : 'btn'}`]}
          onClick={() => setShow('Chatrooms')}
        >Chatrooms</button>
        <button
          className={styles[`${show === 'Contacts' ? 'clicked' : 'btn'}`]}
          onClick={() => setShow('Contacts')}
        >Contacts</button>
      </div>

      {
        show === 'Chatrooms'
        ? <ChatRooms chatrooms={state.chatrooms} />
        : <Contacts contacts={state.contacts}/>
      }
      <button onClick={handleNewClick} className={styles.btn} type="button">
        New {show === 'Chatrooms' ? 'Chat' : 'Contact'}
      </button>
    </aside>
  );
}