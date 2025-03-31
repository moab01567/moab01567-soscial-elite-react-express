import React, { useEffect, useState } from "react";
import { APIUsers } from "../../../../shared/interface";
import { ArticleTeaser } from "./articleTeaser/ArticleTeaser";
import { APIArticle } from "../../../../shared/ArticlesInterfaceAndEnum";
import { LoadingWheel } from "../../components/loadingWheel/LoadingWheel";
import { ArticleRead } from "./articleReadMode/ArticleRead";
import { ArticleEdit } from "./articleEditMode/ArticleEdit";
import * as articleService from "./ArticleService";
import { CreateArticle } from "./createButton/CreateArticle";

interface Props {
  user: APIUsers;
  articlesEndpoint: string;
}
export interface OpenArticleInfo {
  article: APIArticle;
  publisher: APIUsers;
}

export function ArticleFeature({ articlesEndpoint, user }: Props) {
  const [errorMessage, setErrorMessage] = useState<null | string>(null);
  const [updateArticleTeaser, setUpdateArticleTeaser] = useState<null | string>(
    null,
  );
  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editModeTypeCreate, setEditModeTypeCreate] = useState(false);
  const [articles, setArticles] = useState<APIArticle[] | null>(null);
  const [openArticle, setOpenArticle] = useState<OpenArticleInfo | null>(null);

  const getAllArticles = async () => {
    const apiArticles: APIArticle[] = await articleService.getAllArticles(
      articlesEndpoint,
      setErrorMessage,
    );
    setArticles(apiArticles);
  };

  const handleOpenClosedArticle = (article: OpenArticleInfo | null) => {
    setOpen(!open);
    setOpenArticle(article);
    setUpdateArticleTeaser(openArticle?.article.articleId ?? null);
    setEditMode(false);
    setEditModeTypeCreate(false);
  };

  const handleChangeMode = () => {
    setEditMode(!editMode);
  };
  const handleCreateMode = () => {
    setOpen(true);
    setOpenArticle({
      article: {
        articleId: "",
        userId: user.userId,
        text: "",
        title: "",
        timeStamp: Date.now(),
      },
      publisher: user,
    });
    setEditMode(true);
    setEditModeTypeCreate(true);
  };

  useEffect(() => {
    getAllArticles();
  }, [openArticle]);

  if (errorMessage) return <h3>{errorMessage}</h3>;
  if (!articles) return <LoadingWheel></LoadingWheel>;
  return (
    <>
      {!articles.length ? <h3>No Articles Here Yet</h3> : <></>}
      {articles.map((article) => (
        <ArticleTeaser
          resetUpdateArticleTeaser={setUpdateArticleTeaser}
          updateArticleTeaser={updateArticleTeaser}
          key={article.articleId}
          user={user}
          article={article}
          handleOpenClosedArticle={handleOpenClosedArticle}
        />
      ))}
      {open ? (
        editMode ? (
          <ArticleEdit
            editModeTypeCreate={editModeTypeCreate}
            openArticle={openArticle}
            handleOpenClosedArticle={handleOpenClosedArticle}
            user={user}
            handleChangeMode={handleChangeMode}
          />
        ) : (
          <ArticleRead
            handleChangeMode={handleChangeMode}
            user={user}
            openArticle={openArticle}
            handleOpenClosedArticle={handleOpenClosedArticle}
          />
        )
      ) : (
        <></>
      )}
      <CreateArticle
        handleCreateMode={handleCreateMode}
        authority={user.authority}
      />
    </>
  );
}
