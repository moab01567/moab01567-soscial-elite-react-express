import React from "react";
import { Profile } from "../profile/Profile";
import css from "./ReactionInfo.module.css";
import {
  ReactionsEmoji,
  ReactionsEmojiMap,
} from "../../../../shared/ReactionsInterfaceAndEnum";

interface Props {
  imgUrl: string;
  name: string;
  reactionsEmoji: ReactionsEmoji;
}

export function ReactionInfo({ imgUrl, name, reactionsEmoji }: Props) {
  return (
    <div className={css.reactionInfoDiv}>
      <div>
        <Profile imgUrl={imgUrl} name={name} />
      </div>
      <h2>{ReactionsEmojiMap.get(reactionsEmoji)}</h2>
    </div>
  );
}
