import { ReactionsEmoji } from "./ReactionsInterfaceAndEnum";

export interface APIComment {
  articleId: string;
  commentId: string;
  userId: string;
  comment: string;
  timeStamp: string;
}

export interface APIArticle {
  articleId: string;
  userId: string;
  title: string;
  text: string;
  timeStamp: number;
}
export interface ApiArticlePOST {
  userId: string;
  title: string;
  text: string;
}
export interface ApiArticlePUT {
  title: string;
  text: string;
}

export interface APIAnonymousArticle {
  articleId: string;
  title: string;
  reactionsEmoji: Record<ReactionsEmoji, number>;
}
