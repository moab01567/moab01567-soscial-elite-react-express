import {
  APIArticle,
  ApiArticlePOST,
  ApiArticlePUT,
} from "../../../../shared/ArticlesInterfaceAndEnum";
import { APIMessage, APIUsers } from "../../../../shared/interface";
import { APIReactionCounter } from "../../../../shared/ReactionsInterfaceAndEnum";

export async function getAllArticles(
  uriPath: string,
  handleSetErrorMessage: (message: string) => void,
) {
  const response: Response = await fetch(uriPath);
  if (!response.ok) {
    const body: APIMessage = await response.json();
    handleSetErrorMessage(body.displayMessage);
    throw new Error(body.massage);
  }
  const body: APIArticle[] = await response.json();
  return body;
}
export async function getArticleDetails(
  articleId: string,
  publisherId: string,
  setMessage: (displayMessage: string) => void,
) {
  const resReactionCounter: Promise<Response> = fetch(
    `/api/reactions/counter/${articleId}`,
  );
  const resPublisher: Promise<Response> = fetch(`/api/user/${publisherId}`);
  const [publisher, reactionCounter] = await Promise.all([
    resPublisher,
    resReactionCounter,
  ]);
  if (!publisher.ok || !reactionCounter.ok) {
    const publisherBody: APIMessage = await publisher.json();
    const reactionCounterBody: APIMessage = await reactionCounter.json();
    setMessage(
      publisherBody.displayMessage ?? reactionCounterBody.displayMessage,
    );
  }

  return await Promise.all<[APIUsers, APIReactionCounter]>([
    await publisher.json(),
    await reactionCounter.json(),
  ]);
}

export async function deleteArticle(
  articleId: string,
  handleSetErrorMessage: (displayMessage: string) => void,
) {
  const response = await fetch(`/api/article/${articleId}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    const apiMessage: APIMessage = await response.json();
    handleSetErrorMessage(apiMessage.displayMessage);
    throw new Error(apiMessage.massage);
  }
}

export async function putArticle(
  title: string,
  text: string,
  articleId: string,
  setErrorMessage: (displayMessage: string) => void,
) {
  const body: ApiArticlePUT = { title: title, text: text };
  const response = await fetch(`/api/article/${articleId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!response.ok) {
    const apiMessage: APIMessage = await response.json();
    setErrorMessage(apiMessage.displayMessage);
    throw new Error(apiMessage.massage);
  }
}
export async function postArticle(
  articlePOST: ApiArticlePOST,
  setErrorMessage: (displayMessage: string) => void,
) {
  const response = await fetch(`/api/article`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(articlePOST),
  });
  if (!response.ok) {
    const apiMessage: APIMessage = await response.json();
    setErrorMessage(apiMessage.displayMessage);
    throw new Error(apiMessage.massage);
  }
}
