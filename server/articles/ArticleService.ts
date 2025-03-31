import * as articleRepo from "./ArticleRepository";
import * as articleValidator from "./ArticleVaildator";
import {
  APIAnonymousArticle,
  APIArticle,
  ApiArticlePOST,
  ApiArticlePUT,
} from "../../shared/ArticlesInterfaceAndEnum";
import * as reactionService from "../reaction/ReactionService";
import {
  APIReaction,
  APIReactionCounter,
} from "../../shared/ReactionsInterfaceAndEnum";
import { HTTP_BAD_REQUEST, HttpException } from "../HttpException";
import { APIMessage } from "../../shared/interface";

export async function getAnonymousArticles(): Promise<APIAnonymousArticle[]> {
  const articles: APIArticle[] = await articleRepo.getAllArticles(3);
  const anonymousArticles: APIAnonymousArticle[] = [];

  for (const article of articles) {
    const reaction: APIReactionCounter =
      await reactionService.getReactionCounter(article.articleId);
    anonymousArticles.push({
      articleId: article.articleId,
      title: article.title,
      reactionsEmoji: reaction.reaction,
    });
  }
  return anonymousArticles;
}

export async function getArticlesByUserReaction(
  userId: string,
): Promise<APIArticle[]> {
  const reactions: APIReaction[] =
    await reactionService.getReactionsByUserId(userId);
  const articlesIds: string[] = reactions.map((reaction) => reaction.articleId);
  return await articleRepo.getArticlesByArticlesIds(0, articlesIds);
}

export async function getArticles(): Promise<APIArticle[]> {
  return await articleRepo.getAllArticles();
}
export async function getArticlesByUserId(
  userId: string,
): Promise<APIArticle[]> {
  return await articleRepo.getArticlesByUser(0, userId);
}
export async function createArticle(
  postArticle: ApiArticlePOST,
): Promise<APIArticle> {
  articleValidator.validateTitle(postArticle.title);
  articleValidator.validateText(postArticle.text);
  const apiArticles: APIArticle[] = await articleRepo.getArticlesByUser(
    5,
    postArticle.userId,
  );
  articleValidator.validateTime(apiArticles);
  const article = await articleRepo.addArticleToDatabase({
    articleId: crypto.randomUUID(),
    userId: postArticle.userId,
    title: postArticle.title,
    text: postArticle.text,
    timeStamp: Date.now() / 1000,
  });
  if (!article) throw new HttpException(HTTP_BAD_REQUEST, "No article created");
  return article;
}
export async function deleteArticle(articleId: string): Promise<APIMessage> {
  await articleRepo.deleteArticle(articleId);
  return {
    massage: "DELETED",
    status: 204,
    displayMessage: "Article was deleted",
    ok: true,
  };
}

export async function updateArticle(
  articleId: string,
  putArticle: ApiArticlePUT,
): Promise<APIMessage> {
  articleValidator.validateTitle(putArticle.title);
  articleValidator.validateText(putArticle.text);
  const status = await articleRepo.updateArticle(
    articleId,
    putArticle.title,
    putArticle.text,
  );
  if (!status.acknowledged)
    throw new HttpException(HTTP_BAD_REQUEST, "please enter right id");
  return {
    ok: true,
    status: 204,
    massage: "updated",
    displayMessage: "updated",
  };
}
