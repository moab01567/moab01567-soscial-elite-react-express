import { APIUsers } from "../../../../../shared/interface";
import React from "react";
import css from "./ArticleRead.module.css";
import { Profile } from "../../../components/profile/Profile";
import { OpenArticleInfo } from "../ArticleFeature";
import { ReactionFeature } from "../../reaction/ReactionFeature";

interface Props {
  user: APIUsers;
  openArticle: OpenArticleInfo | null;
  handleOpenClosedArticle: (openArticle: OpenArticleInfo | null) => void;
  handleChangeMode: () => void;
}

export function ArticleRead({
  user,
  openArticle,
  handleOpenClosedArticle,
  handleChangeMode,
}: Props) {
  if (!openArticle) {
    return <></>;
  }

  return (
    <>
      <div className={css.articlePopUp}>
        <div className={css.articlePopUpDiv}>
          <div className={css.publisherGridPos}>
            <Profile
              imgUrl={openArticle.publisher.picture}
              name={openArticle.publisher.name}
            />
          </div>
          <div className={css.articleDate}>
            {new Date(openArticle.article.timeStamp).toLocaleString()}
          </div>
          <button
            onClick={() => handleOpenClosedArticle(openArticle)}
            className={css.exitButton}
          >
            X
          </button>
          <div className={css.articleTextGridPos}>
            <h3>{openArticle.article.title}</h3>
            <p>{openArticle.article.text}</p>
          </div>

          <ReactionFeature
            user={user}
            articleId={openArticle.article.articleId}
          />
          <div></div>
          {user.userId === openArticle.publisher.userId ? (
            <button onClick={handleChangeMode}>Edit</button>
          ) : (
            <></>
          )}
        </div>
      </div>
    </>
  );
}
