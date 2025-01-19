import { Fragment } from "react/jsx-runtime";

const poem = {
  lines: [
    'I write, erase, rewrite',
    'Erase again, and then',
    'A poppy blooms.'
  ]
};

export default function Poem() {
  return (
    <article>
      {poem.lines.map((line, index) =>{
        return (
          <Fragment key={index}>
            <p>
              {line}
            </p>
            {(poem.lines.length !== index + 1) && <hr />}
          </Fragment>
        )
      })}
    </article>
  );
}
