import React, { useEffect } from "react";
import { APIUsers } from "../../../../shared/interface";
import { Logout } from "../../features/logout/Logout";
// @ts-ignore
import css from "./ProfilePage.module.css";
import { PageLayout } from "../PageLayout";
import { pageConfig } from "../../PageConfig";

interface Props {
  user: APIUsers;
  path: string;
}

export function ProfilePage({ path, user }: Props) {
  useEffect(() => {
    window.history.replaceState("Updated the URL", "profile", path);
  }, []);
  return (
    <>
      <PageLayout
        user={user}
        pageConfig={pageConfig}
        currentPage={pageConfig.Profile}
      >
        <div className={css.mainDiv}>
          <Logout user={user} />
        </div>
      </PageLayout>
    </>
  );
}
