import { SelectReactionButton } from "./SelectReactionButton";
import { ReactionsEmoji } from "../../../../../shared/ReactionsInterfaceAndEnum";
import React from "react";

interface Props {
  disable: boolean;
  handleSelectedReaction: (reactionsEmoji: ReactionsEmoji) => void;
}
export function ReactionsButton({ disable, handleSelectedReaction }: Props) {
  return (
    <div>
      <SelectReactionButton
        disable={disable}
        reactionsEmoji={ReactionsEmoji.HART}
        handleSelectedReaction={handleSelectedReaction}
      />
      <SelectReactionButton
        disable={disable}
        reactionsEmoji={ReactionsEmoji.THUMBS_UP}
        handleSelectedReaction={handleSelectedReaction}
      />
      <SelectReactionButton
        disable={disable}
        reactionsEmoji={ReactionsEmoji.LAUGHING}
        handleSelectedReaction={handleSelectedReaction}
      />
    </div>
  );
}
