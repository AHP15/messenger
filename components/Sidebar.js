import { useState } from "react";
import ChatRooms from "./ChatRooms";
import Contacts from "./Contacts";

import styles from '../styles/Sidebar.module.css';

export default function Sidebar() {
  const [show, setShow] = useState('Chatrooms');
  const staticData = [
    {
      avatar: "/favicon.ico",
      name: 'name',
      email: 'email1@gmail.com',
      status: 'online',
    },
    {
      avatar: "/favicon.ico",
      name: 'name',
      email: 'email2@gmail.com',
      status: 'offline',
    },
    {
      avatar: "/favicon.ico",
      name: 'name',
      email: 'email3@gmail.com',
      status: 'online',
    },
    {
      avatar: "/favicon.ico",
      name: 'name',
      email: 'email4@gmail.com',
      status: 'offline',
    },
    {
      avatar: "/favicon.ico",
      name: 'name',
      email: 'email5@gmail.com',
      status: 'online',
    },
    {
      avatar: "/favicon.ico",
      name: 'name',
      email: 'email6@gmail.com',
      status: 'offline',
    },
    {
      avatar: "/favicon.ico",
      name: 'name',
      email: 'email7@gmail.com',
      status: 'online',
    },
    {
      avatar: "/favicon.ico",
      name: 'name',
      email: 'email8@gmail.com',
      status: 'offline',
    },
  ];

  const staticData2 = [
    {id: '1', name: 'chat', unreadMessages: 2},
    {id: '2', name: 'chat', unreadMessages: 5},
    {id: '3', name: 'chat', unreadMessages: 2},
    {id: '4', name: 'chat', unreadMessages: 0},
    {id: '5', name: 'chat', unreadMessages: 1},
    {id: '6', name: 'chat', unreadMessages: 2},
  ];
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
        ? <ChatRooms chatrooms={staticData2} />
        : <Contacts contacts={staticData}/>
      }
      <button className={styles.btn} type="button">
        New {show === 'Chatrooms' ? 'Chat' : 'Contact'}
      </button>
    </aside>
  );
}