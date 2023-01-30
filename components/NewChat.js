import { useState } from "react";
import { useStore } from "../context/Store";
import { request } from "../fetch/requests";
import {
  REQUITED_USER,
  CHAT_ADDED,
  ADD_CHAT_FAILED
} from "../context/contstants";
import FormLayout from "./FormLayout";

const SelectContact = ({ id, email, handleChange }) => {
  return (
    <div className="check_contact">
      <input
        type="checkbox"
        id={id}
        value={email}
        onClick={() => handleChange(id)}
      />
      <label htmlFor={id}>{email}</label>
    </div>
  );
}

const NewChat = () => {
  const { state, dispatch } = useStore();
  const [name, setName] = useState('');
  const [users, setUsers] = useState([state.user.id]);
  const [loading, setLoading] = useState(false);

  const handleChange = (id) => {
    if (users.some(userId => userId === id)) {
      setUsers(prev => [...prev.filter(userId => userId !== id)])
    } else {
      setUsers(prev => ([...prev, id]));
    }
  };

  const handleSubmit= (e) => {
    e.preventDefault();

    if (name === '') return;

    if (users.length === 1) {
      dispatch({ type: REQUITED_USER });
    }
    
    setLoading(true);
    request('/api/chat', {
      method: 'POST',
      body: JSON.stringify({ name, users }),
      headers: {
        'Content-Type': 'application/json',
      }
    }).then(data =>{
      if (data.success) {
        dispatch({ type: CHAT_ADDED , data});
      } else {
        dispatch({ type: ADD_CHAT_FAILED, data});
      }
    })
    .finally(() => {
      setUsers([state.user.id]);
      setName('');
      setLoading(false);
    });
  };

  const { contacts } = state;

  if (loading) {
    return (
      <FormLayout>
        loading
      </FormLayout>
    );
  }

  return (
    <FormLayout>
      <h2 className="title">New Chat</h2>
      <input
        type="text"
        placeholder="Enter Chat Name"
        className="model_input"
        value={name}
        onChange={e => setName(e.target.value)}
      />

      <div className="contact_container">
        {
          contacts.map(contact => (
            <SelectContact
              key={contact.id}
              id={contact.id}
              email={contact.email}
              handleChange={handleChange}
            />
          ))
        }
      </div>
      <button onClick={handleSubmit} type="submit" className="btn">Add New Chat</button>
    </FormLayout>
  );
};
export default NewChat;
