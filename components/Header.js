import Link from 'next/link';

import styles from '../styles/Header.module.css';
import Avatar from './Avatar';

export default function Header() {
  return (
    <header className={styles.header}>
      <Link href="/" className={styles.logo}>
        <h1>Chat App</h1>
      </Link>

      <Avatar
        name="Abdessittir Harkati"
        email="harkati.web.dev@gmail.com"
        image="/favicon.ico"
      />
    </header>
  );
}