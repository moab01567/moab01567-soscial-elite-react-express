import React, { useEffect, useState } from "react";
import css from "./profile.module.css";
import profileIcon from "./profileIcon.png";
interface Props {
  imgUrl: string;
  name: string;
}

export const checkIfGetAble = async (imgUrl: string): Promise<boolean> => {
  const response = await fetch(imgUrl);
  return response.ok;
};

export function Profile({ name, imgUrl }: Props) {
  const [imgExist, setImgExist] = useState(false);

  const profilePictureExist = async () => {
    setImgExist(await checkIfGetAble(imgUrl));
  };

  useEffect(() => {
    profilePictureExist();
  }, []);

  return (
    <>
      <div className={css.mainProfileDiv}>
        <div className={css.profilePictureDiv}>
          <img
            className={css.profilePicture}
            src={imgExist ? imgUrl : profileIcon}
            alt="profile picture"
          />
        </div>
        <p>{name}</p>
      </div>
    </>
  );
}
