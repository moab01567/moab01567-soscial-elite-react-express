import {
  APIReactionPOST,
  ReactionsEmoji,
} from "../../../../shared/ReactionsInterfaceAndEnum";
import { APIMessage } from "../../../../shared/interface";

export async function getReactionInfo(
  articleId: string,
  setErrorMessage: (message: string) => void,
) {
  const resReactions: Promise<Response> = fetch(`/api/reactions/${articleId}`);
  const resReactionCounter: Promise<Response> = fetch(
    `/api/reactions/counter/${articleId}`,
  );
  const [reactions, reactionCounter] = await Promise.all([
    resReactions,
    resReactionCounter,
  ]);
  if (!reactions.ok || !reactionCounter.ok) {
    const reactionsBody: APIMessage = await reactions.json();
    const reactionCounterBody: APIMessage = await reactionCounter.json();
    setErrorMessage(
      reactionsBody.displayMessage ?? reactionCounterBody.displayMessage,
    );
  }
  return await Promise.all([reactions.json(), reactionCounter.json()]);
}

export async function POSTReaction(
  selectedReaction: ReactionsEmoji,
  userId: string,
  articleId: string,
) {
  const body: APIReactionPOST = {
    reactionEmoji: selectedReaction,
    userId: userId,
    articleId: articleId,
  };
  return await fetch("/api/reaction", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

export async function DELETEReaction(reactionId: string) {
  return await fetch(`/api/reaction/${reactionId}`, { method: "DELETE" });
}

export async function PUTEReaction(
  reactionId: string,
  reactionsEmoji: ReactionsEmoji,
) {
  return await fetch(`/api/reaction/${reactionId}/${reactionsEmoji}`, {
    method: "PUT",
  });
}
