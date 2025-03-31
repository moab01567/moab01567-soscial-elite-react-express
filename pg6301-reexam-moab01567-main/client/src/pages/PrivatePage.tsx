import React, { JSX } from "react";
import { LoadingWheel } from "../components/loadingWheel/LoadingWheel";

interface Props {
  authenticated: boolean | null;
  fallBackPage: JSX.Element;
  enterPage: JSX.Element;
}

export function PrivatePage({ enterPage, fallBackPage, authenticated }: Props) {
  if (authenticated === null) return <LoadingWheel></LoadingWheel>;

  if (authenticated) return enterPage;

  return fallBackPage;
}
