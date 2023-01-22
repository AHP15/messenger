import FormLayout from "./FormLayout";

const NewChat = () => {
  const handleSubmit= (e) => {
    e.preventDefault();
  };

  return (
    <FormLayout>
      <h2 className="title">New Chat</h2>
      <input
        type="text"
        placeholder="Enter Chat Name"
        className="model_input"
      />
      <button onClick={handleSubmit} type="submit" className="btn">Add New Chat</button>
    </FormLayout>
  );
};
export default NewChat;
