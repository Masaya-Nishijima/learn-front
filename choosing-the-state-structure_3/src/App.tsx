import { useState } from 'react';
import { initialLetters, TLetter } from './data';
import Letter from './Letter';

export default function MailClient() {
  const [letters, setLetters] = useState(initialLetters);
  const [highlightedLetterId, setHighlightedLetterId] = useState<number | null>(null);

  function handleHover(letter: TLetter) {
    setHighlightedLetterId(letter.id);
  }

  function handleStar(starred: TLetter) {
    setLetters(letters.map(letter => {
      if (letter.id === starred.id) {
        return {
          ...letter,
          isStarred: !letter.isStarred
        };
      } else {
        return letter;
      }
    }));
  }

  return (
    <>
      <h2>Inbox</h2>
      <ul>
        {letters.map(letter => (
          <Letter
            key={letter.id}
            letter={letter}
            isHighlighted={
              letter.id === highlightedLetterId
            }
            onHover={handleHover}
            onToggleStar={handleStar}
          />
        ))}
      </ul>
    </>
  );
}
