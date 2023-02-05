import { useStore } from '../context/Store';
import NewChat from './NewChat';
import NewContact from './NewContact';

const Model = () => {
  const {state} = useStore();
  const model = state.model;
  return (
    <div className={`model ${model? 'active' : ''}`}>
      {model === 'Chatrooms' ? <NewChat /> : <NewContact />}
    </div>
  );
};
export default Model;
