import React, { useEffect } from "react";
// @ts-ignore
import style from "./LoginPage.module.css";
import { LoginFeature } from "../../features/login/LoginFeature";
import { ArticleAnonymousFeature } from "../../features/articleAnonymous/ArticleAnonymousFeature";

interface Props {
  path: string;
}

export function LoginPage({ path }: Props) {
  useEffect(() => {
    window.history.replaceState("Updated the URL", "login", path);
  }, []);

  return (
    <div className={style.pageDiv}>
      <div className={style.mainDiv}>
        <h1 className={style.title}>
          Welcome to <br /> Social Elite
        </h1>
        <div className={style.line}></div>
        <LoginFeature></LoginFeature>
        <ArticleAnonymousFeature></ArticleAnonymousFeature>
      </div>
    </div>
  );
}
