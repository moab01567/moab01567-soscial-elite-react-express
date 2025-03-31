import React from "react";
import css from "./ReactionCounter.module.css";
interface Props {
  hart: number;
  thumbsUp: number;
  laughing: number;
}

export function ReactionCounter({ hart, thumbsUp, laughing }: Props) {
  return (
    <>
      <div className={css.mainReactionCounter}>
        <p>❤️{hart}</p>
        <p>👍{thumbsUp}</p>
        <p>😂{laughing}</p>
      </div>
    </>
  );
}
