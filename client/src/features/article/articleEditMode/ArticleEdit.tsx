import { APIUsers } from "../../../../../shared/interface";
import React, { useState } from "react";
import css from "./ArticleEdit.module.css";
import { Profile } from "../../../components/profile/Profile";
import { OpenArticleInfo } from "../ArticleFeature";
import { ApiArticlePOST } from "../../../../../shared/ArticlesInterfaceAndEnum";
import * as articleService from "../ArticleService";
import { b } from "vite/dist/node/moduleRunnerTransport.d-CXw_Ws6P";

interface Props {
  user: APIUsers;
  openArticle: OpenArticleInfo | null;
  handleOpenClosedArticle: (openArticle: OpenArticleInfo | null) => void;
  handleChangeMode: () => void;
  editModeTypeCreate: boolean;
}

export function ArticleEdit({
  user,
  openArticle,
  handleOpenClosedArticle,
  handleChangeMode,
  editModeTypeCreate,
}: Props) {
  if (!openArticle) return <></>;
  const [titleInput, setTitleInput] = useState(openArticle.article.title);
  const [textInput, setTextInput] = useState(openArticle.article.text);
  const [errorMessage, setErrorMessage] = useState<null | string>(null);

  const handleDelete = async () => {
    await articleService.deleteArticle(
      openArticle?.article.articleId,
      setErrorMessage,
    );
    handleOpenClosedArticle(null);
  };
  const handleUpdate = async () => {
    await articleService.putArticle(
      titleInput,
      textInput,
      openArticle.article.articleId,
      setErrorMessage,
    );
    handleOpenClosedArticle(null);
  };
  const handlePost = async () => {
    const body: ApiArticlePOST = {
      userId: user.userId,
      text: textInput,
      title: titleInput,
    };
    await articleService.postArticle(body, setErrorMessage);
    handleOpenClosedArticle(null);
  };

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
            <div className={css.articleInputs}>
              <p style={{ color: "red" }}>{errorMessage ?? ""} </p>
              <textarea
                className={css.articleTitleInput}
                value={titleInput}
                onChange={(event) => setTitleInput(event.target.value)}
                placeholder="Title"
              />
              <textarea
                className={css.articleTextInput}
                value={textInput}
                onChange={(event) => setTextInput(event.target.value)}
                placeholder="Text"
                maxLength={1000}
              />
              <p>{textInput.length + " /1000"}</p>
            </div>
          </div>
          <button disabled={editModeTypeCreate} onClick={handleDelete}>
            Delete Article
          </button>
          <button disabled={editModeTypeCreate} onClick={handleChangeMode}>
            Change To Read Mode
          </button>
          <button onClick={editModeTypeCreate ? handlePost : handleUpdate}>
            {editModeTypeCreate ? "Create" : "Update"}
          </button>
        </div>
      </div>
    </>
  );
}
