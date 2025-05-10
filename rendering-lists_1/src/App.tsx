import { people } from './data.js';
import { getImageUrl } from './utils.js';

function peopleListItems(peopleInfo) {
  return peopleInfo.map(person =>
            <li key={person.id}>
              <img
                src={getImageUrl(person)}
                alt={person.name}
              />
              <p>
                <b>{person.name}:</b>
                {' ' + person.profession + ' '}
                known for {person.accomplishment}
              </p>
            </li>
          )
}

export default function List() {
  const scientistListItems = peopleListItems(
      people.filter((person) => {
        return person.profession === 'chemist'
      })
    )
  const otherPeopleList = peopleListItems(
    people.filter((person) => {
      return person.profession !== 'chemist'
    })
  )

  return (
    <>
      <article>
        <h1>Scientists</h1>
        <ul>{scientistListItems}</ul>
      </article>
      <article>
        <h1>other</h1>
        <ul>{otherPeopleList}</ul>
      </article>
    </>
  );
}
