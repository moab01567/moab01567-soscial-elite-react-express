import React, { useState } from "react";
// @ts-ignore
import cssStyle from "./ArticleAnonymous.module.css";
import { ReactionCounter } from "../../components/reaction/ReactionCounter";

interface Props {
  title: string;
  hart: number;
  laughing: number;
  thumbsUp: number;
}

export function ArticleAnonymous({ title, hart, laughing, thumbsUp }: Props) {
  const [open, setOpen] = useState(false);

  function handleClick() {
    setOpen(true);
    setTimeout(() => setOpen(false), 2000);
  }

  return (
    <>
      <button onClick={handleClick} className={cssStyle.mainDiv}>
        <h3>
          {" "}
          Title: <br /> {title}
        </h3>
        <ReactionCounter hart={hart} thumbsUp={thumbsUp} laughing={laughing} />
      </button>
      <dialog open={open}>Login to see more details</dialog>
    </>
  );
}
