import styles from '../styles/Loading.module.css';

const Loading = () => {
  return (
    <div className={styles.loading}>
      <p className={styles.loading_1}></p>
      <p className={styles.loading_2}></p>
      <p className={styles.loading_3}></p>
    </div>
  );
};

export default Loading;
