import { useState } from 'react';
import FormLayout from './FormLayout';

const NewContact = () => {

  const [email, setEmail] = useState('');
  const handleSubmit= (e) => {
    e.preventDefault();

    if (email === '') return;

    postData('/api/user').then(data => {
      console.log(data);
    });
  };

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