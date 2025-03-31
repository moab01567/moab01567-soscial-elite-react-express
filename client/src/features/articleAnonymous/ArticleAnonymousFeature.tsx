import { useEffect, useState } from "react";
import { LoadingWheel } from "../../components/loadingWheel/LoadingWheel";
import React from "react";
import ccsStyle from "./ArticleAnonymousFeature.module.css";
import { ArticleAnonymous } from "./ArticleAnonymous";
import { APIAnonymousArticle } from "../../../../shared/ArticlesInterfaceAndEnum";
import { ReactionsEmoji } from "../../../../shared/ReactionsInterfaceAndEnum";
import { GETAnonymousArticles } from "./ArticleAnonymousService";

export function ArticleAnonymousFeature() {
  const [errorMessage, setErrorMessage] = useState<null | string>(null);
  const [articles, setArticles] = useState<APIAnonymousArticle[] | null>(null);

  async function getArticleAnonymous() {
    const articles: APIAnonymousArticle[] =
      await GETAnonymousArticles(setErrorMessage);
    setErrorMessage(null);
    setArticles(articles);
  }

  useEffect(() => {
    getArticleAnonymous();
  }, []);

  if (errorMessage) {
    return (
      <div className={ccsStyle.MainGridDiv}>
        <h2 className={ccsStyle.gridItems}>Recent Articles:</h2>
        <h3>{errorMessage}</h3>
      </div>
    );
  }
  if (!articles) return <LoadingWheel></LoadingWheel>;
  if (articles.length === 0)
    return (
      <div className={ccsStyle.MainGridDiv}>
        <h2 className={ccsStyle.gridItems}>Recent Articles:</h2>
        <h3>No Articles here</h3>
      </div>
    );

  return (
    <>
      <div className={ccsStyle.MainGridDiv}>
        <h2 className={ccsStyle.gridItems}>Recent Articles:</h2>
        {articles.map((article) => (
          <div className={ccsStyle.gridItems}>
            <ArticleAnonymous
              key={article.articleId}
              title={article.title}
              thumbsUp={article.reactionsEmoji[ReactionsEmoji.THUMBS_UP]}
              laughing={article.reactionsEmoji[ReactionsEmoji.LAUGHING]}
              hart={article.reactionsEmoji[ReactionsEmoji.HART]}
            ></ArticleAnonymous>
          </div>
        ))}
      </div>
    </>
  );
}
