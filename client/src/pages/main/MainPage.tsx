import React, { useEffect } from "react";
import { ArticleFeature } from "../../features/article/ArticleFeature";
// @ts-ignore
import css from "./MainPage.module.css";
import { APIUsers } from "../../../../shared/interface";
import { PageLayout } from "../PageLayout";
import { pageConfig } from "../../PageConfig";

// @ts-ignore
interface MainPageProps {
  path: string;
  user: APIUsers;
}

export function MainPage({ path, user }: MainPageProps) {
  useEffect(() => {
    window.history.replaceState("Updated the URL", "main", path);
  }, []);

  return (
    <>
      <PageLayout
        user={user}
        pageConfig={pageConfig}
        currentPage={pageConfig.Articles}
      >
        <div className={css.mainDiv}>
          <ArticleFeature
            articlesEndpoint={`/api/article`}
            user={user}
          ></ArticleFeature>
        </div>
      </PageLayout>
    </>
  );
}
