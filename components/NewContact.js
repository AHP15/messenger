import { useState } from 'react';
import { useStore } from '../context/Store';
import { request } from '../fetch/requests';
import {
  CONTACT_ADDED,
  ADD_CONTACT_FAILED
} from '../context/contstants';

import FormLayout from './FormLayout';

const NewContact = () => {
  const { state, dispatch } = useStore();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const handleSubmit= (e) => {
    e.preventDefault();

    if (email === '') return;

    setLoading(true);
    request('/api/user', {
      method: 'PUT',
      body: JSON.stringify({ email, id: state.user.id }),
      headers: {
        'Content-Type': 'application/json',
      }
    })
    .then((data) => {
      dispatch({ type: CONTACT_ADDED, payload: data });
    })
    .catch((err) => {
      dispatch({ type: ADD_CONTACT_FAILED, payload: data });
    })
    .finally((data) => {
      setEmail('');
      setLoading(false);
    });
  };

  if (loading) {
    return (
      <FormLayout>
        loading
      </FormLayout>
    );
  }
  return (
    <FormLayout>
      <h2 className="title">New Contact</h2>
      <input
        type="email"
        placeholder="New contact email"
        className="model_input"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <button onClick={handleSubmit} className="btn" type="submit">Add New Contact</button>
    </FormLayout>
  );
};

export default NewContact;