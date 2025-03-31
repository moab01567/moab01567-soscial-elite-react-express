import { describe, expect, test, vi } from "vitest";
import * as articleService from "../features/article/ArticleService";
import * as appService from "../AppService";
import { render, screen, waitFor } from "@testing-library/react";
import React from "react";
import { APIUsers, EAuthority, ELoginType } from "../../../shared/interface";
import App from "../App";
import { pageConfig } from "../PageConfig";

const user: APIUsers = {
  userId: "1",
  authority: EAuthority.publisher,
  name: "fist",
  picture: "http://test.no",
  loginType: ELoginType.github,
  email: "",
};

describe("Privet Page", () => {
  test("Render Privet Page no enter", async () => {
    //Arrange
    const getAllArticlesSpy = vi.spyOn(articleService, "getAllArticles");
    getAllArticlesSpy.mockResolvedValue([]);
    const getAuthenticationFromServerSpy = vi.spyOn(
      appService,
      "getAuthenticationFromServer",
    );
    getAuthenticationFromServerSpy.mockResolvedValue(user);

    //act
    render(<App />);
    //expect
    waitFor(() =>
      expect(screen.getByText(pageConfig.Articles.Title)).toBeDefined(),
    );
  });
});
