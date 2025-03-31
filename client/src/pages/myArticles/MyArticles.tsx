import React, { useEffect } from "react";
import { ArticleFeature } from "../../features/article/ArticleFeature";
import css from "./MyArticles.module.css";
import { APIUsers } from "../../../../shared/interface";
import { PageLayout } from "../PageLayout";
import { pageConfig } from "../../PageConfig";

interface MainPageProps {
  path: string;
  user: APIUsers;
}

export function MyArticles({ path, user }: MainPageProps) {
  useEffect(() => {
    window.history.replaceState("Updated the URL", "main", path);
  }, []);

  return (
    <>
      <PageLayout
        user={user}
        pageConfig={pageConfig}
        currentPage={pageConfig.MyArticles}
      >
        <div className={css.mainDiv}>
          <ArticleFeature
            articlesEndpoint={`/api/article/${user.userId}`}
            user={user}
          ></ArticleFeature>
        </div>
      </PageLayout>
    </>
  );
}
