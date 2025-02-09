import { useState } from "react";

export default function Picture() {
  const [isActive, setIsActive] = useState(false)

  function handleClickBackground() {
    setIsActive(false);
  }

  function handleClickPicture(e) {
    e.stopPropagation();
    setIsActive(true);
  }

  return (
    <div
      className={isActive ?  "background": "background background--active"}
      onClick={handleClickBackground}
    >
      <img
        className={isActive ? "picture picture--active" : "picture"}
        alt="Rainbow houses in Kampung Pelangi, Indonesia"
        src="https://i.imgur.com/5qwVYb1.jpeg"
        onClick={handleClickPicture}
      />
    </div>
  );
}
