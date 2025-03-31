import React from "react";
// @ts-ignore
import css from "./Header.module.css";

interface Props {
  title: string;
  className?: any;
}

export function Header({ title, className = "" }: Props) {
  return (
    <>
      <header className={css.header + " " + className}>
        <h1>{title}</h1>
      </header>
    </>
  );
}
