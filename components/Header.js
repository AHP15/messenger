import Link from 'next/link';
import { useStore } from '../context/Store';

import styles from '../styles/Header.module.css';
import Avatar from './Avatar';

export default function Header() {
  const { state } = useStore();
  const user = state.user;
  return (
    <header className={styles.header}>
      <Link href="/" className={styles.logo}>
        <h1>Chat App</h1>
      </Link>

      <Avatar
        name={user.name}
        email={user.email}
        image={user.image}
      />
    </header>
  );
}