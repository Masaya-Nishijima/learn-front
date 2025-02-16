import { ActionDispatch } from "react";
import { TContact } from "./App";
import { TAction } from "./messengerReducer";

export default function ContactList({contacts, selectedId, dispatch}: {contacts: Array<TContact>, selectedId: number, dispatch: ActionDispatch<[action: TAction]>}) {
  return (
    <section className="contact-list">
      <ul>
        {contacts.map((contact) => (
          <li key={contact.id}>
            <button
              onClick={() => {
                dispatch({
                  type: 'changed_selection',
                  contactId: contact.id,
                });
              }}>
              {selectedId === contact.id ? <b>{contact.name}</b> : contact.name}
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
