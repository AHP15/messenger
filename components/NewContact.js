import FormLayout from './FormLayout';

const NewContact = () => {
  const handleSubmit= (e) => {
    e.preventDefault();
  };

  return (
    <FormLayout>
      <h2 className="title">New Contact</h2>
      <input
        type="email"
        placeholder="New contact email"
        className="model_input"
      />
      <button onClick={handleSubmit} className="btn" type="submit">Add New Contact</button>
    </FormLayout>
  );
};

export default NewContact;