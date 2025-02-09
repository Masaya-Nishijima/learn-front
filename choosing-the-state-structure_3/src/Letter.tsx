import { TLetter } from "./data";

export default function Letter({
  letter,
  isHighlighted,
  onHover,
  onToggleStar,
}: {
  letter: TLetter,
  isHighlighted: boolean,
  onHover: (arg0: TLetter) => void,
  onToggleStar: (arg0: TLetter) => void
}) {
  return (
    <li
      className={
        isHighlighted ? 'highlighted' : ''
      }
      onFocus={() => {
        onHover(letter);
      }}
      onPointerMove={() => {
        onHover(letter);
      }}
    >
      <button onClick={() => {
        onToggleStar(letter);
      }}>
        {letter.isStarred ? 'Unstar' : 'Star'}
      </button>
      {letter.subject}
    </li>
  )
}
