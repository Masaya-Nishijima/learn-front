import { useState, useRef } from 'react';

export default function Chat() {
  const [text, setText] = useState('');
  const currentTextRef = useRef('');
  currentTextRef.current = text;

  function handleSend() {
    setTimeout(() => {
      alert('Sending: ' + currentTextRef.current);
    }, 3000);
  }

  return (
    <>
      <input
        value={text}
        onChange={e => setText(e.target.value)}
      />
      <button
        onClick={handleSend}>
        Send
      </button>
    </>
  );
}
