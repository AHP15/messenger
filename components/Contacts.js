import ContactItem from "./ContactItem";

const Contacts = ({ contacts }) => {
  return (
    <div className="items">
      {
        contacts.map(contact => (
          <ContactItem
            key={contact.email}
            avatar={contact.avatar}
            name={contact.name}
            email={contact.email}
            status={contact.status}
          />
        ))
      }
    </div>
  );
};
export default Contacts;
