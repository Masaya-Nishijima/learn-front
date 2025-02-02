import { useRef } from 'react';
import SearchButton from './SearchButton';
import SearchInput from './SearchInput';

export default function Page() {
  const inputRef = useRef();

  return (
    <>
      <nav>
        <SearchButton onClick={() => {inputRef.current.focus()}} />
      </nav>
      <SearchInput ref={inputRef} />
    </>
  );
}
