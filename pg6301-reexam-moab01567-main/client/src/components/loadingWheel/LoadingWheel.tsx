import React from "react";
// @ts-ignore
import style from "./LoadingWheel.module.css";

export function LoadingWheel() {
  return (
    <div className={style.MainLoadingWheelDiv}>
      <div className={style.LoadingWheel}></div>
    </div>
  );
}
