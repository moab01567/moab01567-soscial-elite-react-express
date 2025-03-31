import React, { JSX } from "react";
// @ts-ignore
import css from "./PageLayout.module.css";
import { Header } from "../components/header/Header";
import { Menu } from "../components/menu/Menu";
import { APIUsers } from "../../../shared/interface";

import { PageConfig, Pages } from "../PageConfig";

interface Props {
  children: JSX.Element;
  user: APIUsers;
  pageConfig: Record<Pages, PageConfig>;
  currentPage: PageConfig;
}

export function PageLayout({ currentPage, pageConfig, user, children }: Props) {
  return (
    <>
      <div className={css.PageGridLayout}>
        <Header
          className={css.PageHeaderSection}
          title={currentPage.Title}
        ></Header>
        <Menu
          currentPage={currentPage}
          pageConfig={pageConfig}
          authority={user.authority}
          className={css.PageMenuSection}
        ></Menu>
        {children}
      </div>
    </>
  );
}
