import styles from '../styles/FormLayout.module.css';
import Close from './Close';

import { CLOSE_MODEL } from '../context/contstants';
import { useStore } from '../context/Store';

const FormLayout = ({ children }) => {
  const { dispatch } = useStore();

  return (
    <form className={styles.form}>
      <Close close={() => dispatch({ type: CLOSE_MODEL })} />
      {children}
    </form>
  );
};
export default FormLayout;
