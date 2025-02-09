import { useState } from 'react';
import { letters, TLetter } from './data';
import Letter from './Letter';

export default function MailClient() {
  const [selectedIds, setSelectedIds] = useState<Array<number>>([]);

  // TODO: allow multiple selection
  const selectedCount = selectedIds.length;

  function handleToggle(toggledId: number) {
    // TODO: allow multiple selection
    if (selectedIds && selectedIds.includes(toggledId)) {
      setSelectedIds(selectedIds.filter((id) => {
        return id !== toggledId;
      }))
    } else {
      setSelectedIds(selectedIds.concat(toggledId))
    }
  }

  return (
    <>
      <h2>Inbox</h2>
      <ul>
        {letters.map(letter => (
          <Letter
            key={letter.id}
            letter={letter}
            isSelected={
              // TODO: allow multiple selection
              selectedIds.includes(letter.id)
            }
            onToggle={handleToggle}
          />
        ))}
        <hr />
        <p>
          <b>
            You selected {selectedCount} letters
          </b>
        </p>
      </ul>
    </>
  );
}
