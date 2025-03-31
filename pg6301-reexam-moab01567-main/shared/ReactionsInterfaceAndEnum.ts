import { APIUsers } from "./interface";

export enum ReactionsEmoji {
  HART,
  LAUGHING,
  THUMBS_UP,
}
// @ts-ignore
export const ReactionsEmojiMap: Map<ReactionsEmoji, string> = new Map<
  ReactionsEmoji,
  string
>();
ReactionsEmojiMap.set(ReactionsEmoji.HART, "❤️");
ReactionsEmojiMap.set(ReactionsEmoji.LAUGHING, "😂");
ReactionsEmojiMap.set(ReactionsEmoji.THUMBS_UP, "👍");

export interface APIReaction {
  articleId: string;
  userId: string;
  reactionId: string;
  reactionEmoji: ReactionsEmoji;
  timeStamp: string;
}

export interface APIReactionPOST {
  articleId: string;
  userId: string;
  reactionEmoji: ReactionsEmoji;
}

export interface APIReactionAndUser {
  user: APIUsers;
  reaction: APIReaction;
}

export interface APIReactionCounter {
  articleId: string;
  reaction: Record<ReactionsEmoji, number>;
}
