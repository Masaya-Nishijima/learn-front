export default function Clock({ time }: { time: Date}) {
  // eslint-disable-next-line prefer-const
  let hours = time.getHours();
  let className;
  if (hours >= 0 && hours <= 6) {
    className = 'night';
  } else {
    className = 'day';
  }
  return (
    <h1 id="time" className={className}>
      {time.toLocaleTimeString()}
    </h1>
  );
}
