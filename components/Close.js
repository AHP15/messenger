import styles from '../styles/Close.module.css';

const Close = ({ close }) => {
  return (
    <div onClick={close} className={styles.container}>
      <div className={styles.close}></div>
    </div>
  );
};
export default Close;
