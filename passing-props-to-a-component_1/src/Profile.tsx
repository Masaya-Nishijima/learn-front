import { Profile as ProfileType } from "./types"
export default function Profile({profileData} : { profileData: ProfileType}) {
  return (
    <section className="profile">
      <h2>{profileData.name}</h2>
      <img
        className="avatar"
        src={profileData.image.src}
        alt={profileData.name} // altには名前が入る想定で実装
        width={70}
        height={70}
      />
      <ul>
        <li>
          <b>Profession: </b>
          {profileData.profession}
        </li>
        <li>
          <b>Awards: {profileData.awards.length} </b>
          ({profileData.awards.join(', ')})
        </li>
        <li>
          <b>Discovered: </b>
          {profileData.discovered}
        </li>
      </ul>
    </section>
  )
}
