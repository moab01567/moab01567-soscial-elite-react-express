import * as reactionRepo from "./ReactionRepository";
import * as userService from "../users/UserService";
import {
  APIReaction,
  APIReactionAndUser,
  APIReactionCounter,
  APIReactionPOST,
  ReactionsEmoji,
} from "../../shared/ReactionsInterfaceAndEnum";

export async function deleteReaction(reactionId: string) {
  await reactionRepo.deleteReaction(reactionId);
}
export async function postNewReaction(reactionPost: APIReactionPOST) {
  const newReaction: APIReaction = {
    reactionId: crypto.randomUUID(),
    timeStamp: new Date().toString(),
    articleId: reactionPost.articleId,
    userId: reactionPost.userId,
    reactionEmoji: reactionPost.reactionEmoji,
  };
  return await reactionRepo.addNewReaction(newReaction);
}

export async function getReactionCounter(
  articleId: string,
): Promise<APIReactionCounter> {
  const reactions: APIReaction[] =
    await reactionRepo.getReactionsWithArticleIds(articleId);
  const reactionCounter: Record<ReactionsEmoji, number> = {
    [ReactionsEmoji.HART]: 0,
    [ReactionsEmoji.THUMBS_UP]: 0,
    [ReactionsEmoji.LAUGHING]: 0,
  };
  reactions.forEach((reaction) => {
    reactionCounter[reaction.reactionEmoji] += 1;
  });
  return { articleId: articleId, reaction: reactionCounter };
}

export async function getReactionsByArticleId(
  articleId: string,
): Promise<APIReactionAndUser[]> {
  const reactions: APIReaction[] =
    await reactionRepo.getReactionsWithArticleIds(articleId);
  const reactionAndUsers: APIReactionAndUser[] = [];
  for (let reaction of reactions) {
    reactionAndUsers.push({
      reaction: reaction,
      user: await userService.getUserById(reaction.userId),
    });
  }
  return reactionAndUsers;
}
export async function getReactionsByUserId(
  userId: string,
): Promise<APIReaction[]> {
  return await reactionRepo.getReactionsByUserId(userId);
}

export async function putReaction(
  reactionId: string,
  reactionsEmoji: ReactionsEmoji,
) {
  await reactionRepo.putReaction(reactionId, reactionsEmoji);
}
