import Image from 'next/image';

import styles from '../styles/ContactItem.module.css';

const ContactItem = ({ id, avatar, name, email, status }) => {
  return (
    <div className={styles.contact_item}>
      <div className={styles.contact_avatar}>
        <Image
          src={avatar}
          alt={name}
          width="45"
          height="45"
        />
      </div>
      <div className={styles.contact_info}>
        <h3>{name}</h3>
        <p>{email}</p>
      </div>

      <p className={styles[status]}></p>
    </div>
  );
};
export default ContactItem;
