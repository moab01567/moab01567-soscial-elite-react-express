import React, { useEffect, useState } from "react";
import css from "./ReactionFeature.module.css";
import { ReactionCounter } from "../../components/reaction/ReactionCounter";
import { APIUsers } from "../../../../shared/interface";
import { ReactionInfo } from "../../components/reaction/ReactionInfo";
import { LoadingWheel } from "../../components/loadingWheel/LoadingWheel";
import {
  APIReactionAndUser,
  APIReactionCounter,
  ReactionsEmoji,
} from "../../../../shared/ReactionsInterfaceAndEnum";
import * as reactionService from "./ReactionService";
import { ReactionsButton } from "./reactionButtons/ReactionsButton";

interface Props {
  user: APIUsers;
  articleId: string;
}

export function ReactionFeature({ user, articleId }: Props) {
  const [errorMessage, setErrorMessage] = useState<string | null>();
  const [disable, setDisable] = useState(false);
  const [reactionCounter, setReactionCounter] =
    useState<APIReactionCounter | null>(null);
  const [reactions, setReactions] = useState<APIReactionAndUser[] | null>();
  const [open, setOpen] = useState(false);
  const [yourReaction, setYourReaction] = useState<APIReactionAndUser | null>(
    null,
  );
  const getOrUpdateReaction = async () => {
    const [reactions, reactionCounter]: [
      APIReactionAndUser[],
      APIReactionCounter,
    ] = await reactionService.getReactionInfo(articleId, setErrorMessage);
    setErrorMessage(null);
    setReactionCounter(reactionCounter);
    setReactions(reactions);
    setYourReaction(
      reactions.find((reaction) => reaction.user.userId == user.userId) ?? null,
    );
    setDisable(false);
  };
  async function handleSelectedReaction(reactionsEmoji: ReactionsEmoji) {
    setDisable(true);
    if (!reactions) return;
    if (!yourReaction) {
      await reactionService.POSTReaction(
        reactionsEmoji,
        user.userId,
        articleId,
      );
    } else if (reactionsEmoji === yourReaction.reaction.reactionEmoji) {
      await reactionService.DELETEReaction(yourReaction.reaction.reactionId);
    } else if (reactionsEmoji !== yourReaction.reaction.reactionEmoji) {
      await reactionService.PUTEReaction(
        yourReaction.reaction.reactionId,
        reactionsEmoji,
      );
    }
    getOrUpdateReaction();
  }

  useEffect(() => {
    getOrUpdateReaction();
  }, [open]);

  if (errorMessage) return <p>{errorMessage}</p>;
  if (!reactionCounter || !reactions) return <LoadingWheel />;
  return (
    <div>
      {open ? (
        <div className={css.reactionDiv}>
          <ReactionsButton
            disable={disable}
            handleSelectedReaction={handleSelectedReaction}
          />
          <div className={css.reactionDialogDivInfo}>
            {reactions.length === 0 ? (
              <p className={css.reactionDialogDivInfo}>No reactions yet</p>
            ) : (
              ""
            )}

            {reactions ? (
              reactions.map((reaction) => (
                <ReactionInfo
                  imgUrl={reaction.user.picture}
                  name={reaction.user.name}
                  reactionsEmoji={reaction.reaction.reactionEmoji}
                />
              ))
            ) : (
              <LoadingWheel />
            )}
          </div>
        </div>
      ) : (
        <></>
      )}
      <button onClick={() => setOpen(!open)} className={css.reactionButton}>
        <ReactionCounter
          hart={reactionCounter.reaction[ReactionsEmoji.HART]}
          thumbsUp={reactionCounter.reaction[ReactionsEmoji.THUMBS_UP]}
          laughing={reactionCounter.reaction[ReactionsEmoji.LAUGHING]}
        ></ReactionCounter>
      </button>
    </div>
  );
}
