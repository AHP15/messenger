import { useState } from "react";
import { postData } from "../fetch/requests";
import FormLayout from "./FormLayout";

const NewChat = () => {
  const [name, setName] = useState('');
  const handleSubmit= (e) => {
    e.preventDefault();

    if (name === '') return;
    
    postData('/api/chat').then(data =>{
      console.log(data);
    });
  };

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
      <button onClick={handleSubmit} type="submit" className="btn">Add New Chat</button>
    </FormLayout>
  );
};
export default NewChat;
