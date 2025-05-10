import { getImageUrl } from './utils.ts';
import ProfileSection from './Profile.tsx';
import { Profile } from './types'

export default function Gallery() {
  const profiles: Array<Profile> = [
    {
      name: 'Maria Skłodowska-Curie',
      image: {
        src: getImageUrl('szV5sdG')
      },
      profession: 'physicist and chemist',
      awards: ['Nobel Prize in Physics', 'Nobel Prize in Chemistry', 'Davy Medal', 'Matteucci Medal'],
      discovered: 'polonium (chemical element)'
    },
    {
      name: 'Katsuko Saruhashi',
      image: {
        src: getImageUrl('YfeOqp2')
      },
      profession: 'geochemist',
      awards: ['Miyake Prize for geochemistry', 'Tanaka Prize'],
      discovered: 'a method for measuring carbon dioxide in seawater'
    }
  ]
  return (
    <div>
      <h1>Notable Scientists</h1>
      {profiles.map((profile) => {
        return <ProfileSection profileData={profile} />
      })}
    </div>
  );
}
