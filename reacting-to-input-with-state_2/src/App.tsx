import { useState } from "react";

export default function EditProfile() {
  const [firstName, setFirstName] = useState("Jane");
  const [lastName, setLastName] = useState("Jacobs");
  const [isEdit, setIsEdit] = useState(false);

  return (
    <form>
      <label>
        First name:{' '}
        {isEdit ?
          <input
            value={firstName}
            onChange={e=> setFirstName(e.target.value)}
          />:
          <b>{firstName}</b>
        }
      </label>
      <label>
        Last name:{' '}
        {isEdit ?
          <input
            value={lastName}
            onChange={e => setLastName(e.target.value)}
          />:
          <b>{lastName}</b>
        }
      </label>
      <button type="submit" onClick={(e) => {
          e.preventDefault()
          setIsEdit(!isEdit)
        }}>
        {isEdit ?
          "Save":
          "Edit Profile"
        }
      </button>
      <p><i>Hello, {firstName} {lastName}!</i></p>
    </form>
  );
}
