import { HTTP_BAD_REQUEST, HttpException } from "../HttpException";
import { APIArticle } from "../../shared/ArticlesInterfaceAndEnum";

export function validateTitle(title: string) {
  if (title.length === 0)
    throw new HttpException(HTTP_BAD_REQUEST, "Article title can not be empty");
}

export function validateText(text: string) {
  if (text.length > 1000)
    throw new HttpException(
      HTTP_BAD_REQUEST,
      "Max character allowed in article text is 1000",
    );
  if (text.split(" ").length < 10)
    throw new HttpException(
      HTTP_BAD_REQUEST,
      "You need at least 10 words in article text",
    );
}

export function validateTime(apiArticles: APIArticle[]) {
  if (apiArticles.length === 5) {
    if (Date.now() / 1000 - apiArticles[4].timeStamp < 3600)
      throw new HttpException(
        HTTP_BAD_REQUEST,
        "You already published 5 articles in one hour, please wait",
      );
  }
}
