import { CLEAR_ALERT } from '../context/contstants';
import { useStore } from '../context/Store';
import styles from '../styles/Alert.module.css';
import Close from './Close';

const Alert = ({ type, message }) => {
  const { dispatch } = useStore();
  return (
    <div className={styles[type === 'error' ? 'error' : 'success']}>
      <p>{message}</p>
      <Close close={() => dispatch({ type: CLEAR_ALERT })} />
    </div>
  );
};
export default Alert;
