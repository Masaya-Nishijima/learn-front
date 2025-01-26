export default function FeedbackForm() {

  function handleClick() {
    alert(`Hello, ${prompt('What is your name?')}!`);
  }

  return (
    <button onClick={handleClick}>
      Greet
    </button>
  );
}
