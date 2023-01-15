import styles from '../styles/Main.module.css';

import { useStore } from '../context/Store';
import { TOGGLE_SELECTED_CHAT } from '../context/contstants';

export default function Main() {
  const { state, dispatch } = useStore();
  return (
    <main className={styles[state.selectedRoom ? 'opened_chat' : 'chat' ]}>
      <button onClick={() => dispatch({ type: TOGGLE_SELECTED_CHAT, id: null })}>
        Close
      </button>
      <p>{state.selectedRoom}</p>
    </main>
  );
}
