import { APIUsers, ELoginType } from "../../../../shared/interface";
import React from "react";
// @ts-ignore
import css from "./Logout.module.css";
import { Profile } from "../../components/profile/Profile";

interface Props {
  user: APIUsers;
}

export function Logout({ user }: Props) {
  return (
    <>
      <div className={css.mainDiv}>
        <Profile imgUrl={user.picture} name={user.name} />
        <p>
          {user.loginType === ELoginType.github
            ? "(If GitHub doesn't provide your name, your username will be shown by default.)"
            : ""}
        </p>
        <br />
        <a className={css.logoutButton} href={"/api/logout"}>
          logout
        </a>
      </div>
    </>
  );
}
