import { ActionDispatch } from 'react';
import { TContact } from './App.tsx'
import { TAction } from './messengerReducer';

export default function Chat({contact, message, dispatch}: {contact: TContact, message: string, dispatch: ActionDispatch<[action: TAction]>}) {
  return (
    <section className="chat">
      <textarea
        value={message}
        placeholder={'Chat to ' + contact.name}
        onChange={(e) => {
          dispatch({
            type: 'edited_message',
            message: e.target.value,
          });
        }}
      />
      <br />
      <button
        onClick={() => {
          alert(`Sending "${message}" to ${contact.email}`);
          dispatch({
            type: 'sent_message',
          });
        }}>
        Send to {contact.email}
      </button>
    </section>
  );
}
