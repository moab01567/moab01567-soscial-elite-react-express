import React from "react";
// @ts-ignore
import style from "./LoginFeature.module.css";
import { LoginIcon } from "./LoginIcon";

export function LoginFeature() {
  return (
    <div className={style.loginBox}>
      <div className={style.loginDivBox}>
        <a href={"/api/login/google/auth"} className={style.loginLinkButton}>
          <LoginIcon google={true} />
          <p>Login With Google</p>
        </a>
      </div>
      <div className={style.loginDivBox}>
        <a className={style.loginLinkButton} href={"/api/login/github/auth"}>
          <LoginIcon google={false} />
          <p>Login With Github</p>
        </a>
      </div>
    </div>
  );
}
