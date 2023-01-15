import { signOut } from 'next-auth/react';
import Image from 'next/image';
import { useRef } from 'react';

import styles from '../styles/Avatar.module.css';

const Avatar = ({ name, email, image }) => {
  const ulRef = useRef();

  const handleClick = () => {
    ulRef.current.classList.toggle('show_list');
  }

  return (
    <nav className={styles.nav}>
      <div className={styles.avatar} onClick={handleClick}>
        <Image
          src={image}
          width="45"
          height="45"
          alt={name}
        />
      </div>
      <ul ref={ulRef} className={styles.list}>
        <li>{name}</li>
        <li>{email}</li>
        <li onClick={signOut}>SingOut</li>
      </ul>
    </nav>
  );
};

export default Avatar;