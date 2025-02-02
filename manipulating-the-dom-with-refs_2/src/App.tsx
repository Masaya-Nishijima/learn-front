import { useRef } from "react";

export default function Page() {
  const inputRef = useRef();

  function handleClick() {
    inputRef.current.focus();
  }

  return (
    <>
      <nav>
        <button onClick={handleClick}>Search</button>
      </nav>
      <input
        placeholder="Looking for something?"
        ref={inputRef}
      />
    </>
  );
}
