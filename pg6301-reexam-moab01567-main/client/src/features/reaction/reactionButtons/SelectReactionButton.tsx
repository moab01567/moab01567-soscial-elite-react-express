import {
  ReactionsEmoji,
  ReactionsEmojiMap,
} from "../../../../../shared/ReactionsInterfaceAndEnum";
import React from "react";

interface Props {
  disable: boolean;
  reactionsEmoji: ReactionsEmoji;
  handleSelectedReaction: (reactionsEmoji: ReactionsEmoji) => void;
}

export function SelectReactionButton({
  disable,
  reactionsEmoji,
  handleSelectedReaction,
}: Props) {
  return (
    <button
      disabled={disable}
      onClick={() => handleSelectedReaction(reactionsEmoji)}
    >
      {ReactionsEmojiMap.get(reactionsEmoji)}
    </button>
  );
}
