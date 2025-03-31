import React from "react";
// @ts-ignore
import css from "./Menu.module.css";
import { EAuthority } from "../../../../shared/interface";
import { useNavigate } from "react-router-dom";

import { PageConfig, Pages } from "../../PageConfig";

interface Props {
  authority: EAuthority;
  className?: any;
  currentPage: PageConfig;
  pageConfig: Record<Pages, PageConfig>;
}

export function Menu({
  authority,
  className = "",
  currentPage,
  pageConfig,
}: Props) {
  const navigate = useNavigate();
  return (
    <>
      <nav className={css.nav + " " + className}>
        <h3 className={css.navTitle}>Menu</h3>

        <div
          onClick={() => navigate(pageConfig.Articles.Path)}
          className={css.navButton}
        >
          {pageConfig.Articles.MenuButton}
        </div>
        <div
          onClick={() => navigate(pageConfig.Reacted.Path)}
          className={css.navButton}
        >
          {pageConfig.Reacted.MenuButton}
        </div>
        {authority == EAuthority.publisher ? (
          <div
            onClick={() => navigate(pageConfig.MyArticles.Path)}
            className={css.navButton}
          >
            {pageConfig.MyArticles.MenuButton}
          </div>
        ) : (
          <></>
        )}
        <div
          onClick={() => navigate(pageConfig.Profile.Path)}
          className={css.navButton}
        >
          {pageConfig.Profile.MenuButton}
        </div>
      </nav>
    </>
  );
}
