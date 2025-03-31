import { APIAnonymousArticle } from "../../../../shared/ArticlesInterfaceAndEnum";
import { APIMessage } from "../../../../shared/interface";

export async function GETAnonymousArticles(
  setErrorMessage: (message: string) => void,
): Promise<APIAnonymousArticle[]> {
  const response = await fetch("/api/article/anonymous");
  if (!response.ok) {
    const body: APIMessage = await response.json();
    setErrorMessage(body.displayMessage);
  }
  return await response.json();
}
