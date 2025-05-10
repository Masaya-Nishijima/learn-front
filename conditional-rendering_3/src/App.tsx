function Drink({ name }) {
  let drinkInfo
  if (name === 'tea') {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    drinkInfo = {
      part: 'leaf',
      caffein: '15–70 mg/cup',
      age: '4,000+ years'
    }
  } else {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    drinkInfo = {
      part: 'bean',
      caffein: '80–185 mg/cup',
      age: '1,000+ years'
    }
  }
  return (
    <section>
      <h1>{name}</h1>
      <dl>
        <dt>Part of plant</dt>
        <dd>{drinkInfo.part}</dd>
        <dt>Caffeine content</dt>
        <dd>{drinkInfo.caffein}</dd>
        <dt>Age</dt>
        <dd>{drinkInfo.age}</dd>
      </dl>
    </section>
  );
}

export default function DrinkList() {
  return (
    <div>
      <Drink name="tea" />
      <Drink name="coffee" />
    </div>
  );
}
