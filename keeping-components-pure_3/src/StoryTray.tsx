export default function StoryTray({ stories }) {
  const storiesAddCreate = stories.concat({
    id: 'create',
    label: 'Create Story'
  });

  return (
    <ul>
      {storiesAddCreate.map(story => (
        <li key={story.id}>
          {story.label}
        </li>
      ))}
    </ul>
  );
}
