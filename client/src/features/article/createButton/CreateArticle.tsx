import React from "react";
import { EAuthority } from "../../../../../shared/interface";
import css from "./CreateArticle.module.css";
interface Props {
  authority: EAuthority;
  handleCreateMode: () => void;
}

export function CreateArticle({ handleCreateMode, authority }: Props) {
  if (authority !== EAuthority.publisher) return <></>;

  return (
    <button className={css.createButton} onClick={handleCreateMode}>
      Create Article
    </button>
  );
}
