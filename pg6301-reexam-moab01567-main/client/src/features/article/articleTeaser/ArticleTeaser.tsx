import css from "./ArticleTeaser.module.css";
import React, { useEffect, useState } from "react";
import { APIUsers } from "../../../../../shared/interface";
import { APIArticle } from "../../../../../shared/ArticlesInterfaceAndEnum";
import { LoadingWheel } from "../../../components/loadingWheel/LoadingWheel";
import * as articleService from "../ArticleService";
import { Profile } from "../../../components/profile/Profile";
import { ReactionCounter } from "../../../components/reaction/ReactionCounter";
import { OpenArticleInfo } from "../ArticleFeature";
import {
  APIReactionCounter,
  ReactionsEmoji,
} from "../../../../../shared/ReactionsInterfaceAndEnum";

interface Props {
  user: APIUsers;
  article: APIArticle;
  handleOpenClosedArticle: (article: OpenArticleInfo) => void;
  updateArticleTeaser: string | null;
  resetUpdateArticleTeaser: (update: string | null) => void;
}

export function ArticleTeaser({
  article,
  handleOpenClosedArticle,
  user,
  updateArticleTeaser,
  resetUpdateArticleTeaser,
}: Props) {
  const [reactions, setReactions] = useState<APIReactionCounter | null>(null);
  const [publisher, setPublisher] = useState<null | APIUsers>(null);
  const [error, setError] = useState<string | null>(null);

  async function getArticleDetails() {
    const [publisher, reactionCounter] = await articleService.getArticleDetails(
      article.articleId,
      article.userId,
      setError,
    );
    setError(null);
    setPublisher(publisher);
    setReactions(reactionCounter);
  }

  function handleClick() {
    if (publisher && reactions) {
      handleOpenClosedArticle({
        article: article,
        publisher: publisher,
      });
    }
  }

  useEffect(() => {
    if (updateArticleTeaser === article.articleId) {
      resetUpdateArticleTeaser(null);
      setReactions(null);
    }
    getArticleDetails();
  }, [updateArticleTeaser]);

  if (error) return <p>{error}</p>;
  return (
    <>
      <div onClick={handleClick} className={css.mainDiv}>
        <div className={css.topSection}>
          {publisher ? (
            <Profile imgUrl={publisher.picture} name={publisher.name} />
          ) : (
            <LoadingWheel />
          )}
        </div>
        <div className={css.lineVertical}></div>
        <div className={css.middleSection}>
          <h3>{article.title}</h3>
          <p>{new Date(article.timeStamp * 1000).toLocaleString()}</p>
          <p>(Click on me for more details)</p>
        </div>

        <div className={css.bottomSection}>
          {reactions ? (
            <ReactionCounter
              hart={reactions.reaction[ReactionsEmoji.HART]}
              thumbsUp={reactions.reaction[ReactionsEmoji.THUMBS_UP]}
              laughing={reactions.reaction[ReactionsEmoji.LAUGHING]}
            />
          ) : (
            <LoadingWheel />
          )}
        </div>
      </div>
    </>
  );
}
