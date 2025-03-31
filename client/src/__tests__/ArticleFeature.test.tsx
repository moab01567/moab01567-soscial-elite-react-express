import { describe, expect, test, vi } from "vitest";
import * as articleService from "../features/article/ArticleService";
import * as reactionService from "../features/reaction/ReactionService";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import React from "react";
import { ArticleFeature } from "../features/article/ArticleFeature";
import { APIUsers, EAuthority, ELoginType } from "../../../shared/interface";
import { APIArticle } from "../../../shared/ArticlesInterfaceAndEnum";
import {
  APIReactionAndUser,
  APIReactionCounter,
  ReactionsEmoji,
} from "../../../shared/ReactionsInterfaceAndEnum";

describe("Readers ArticleFeature", () => {
  test("Renders 0 teasers expect 'No Articles Here Yet' message", async () => {
    const user: APIUsers = {
      userId: "1",
      authority: EAuthority.publisher,
      name: "fist",
      picture: "http://test.no",
      loginType: ELoginType.github,
      email: "",
    };

    //Arrange
    const getAllArticlesSpy = vi.spyOn(articleService, "getAllArticles");
    getAllArticlesSpy.mockResolvedValue([]);

    //Act
    render(<ArticleFeature user={user} articlesEndpoint={"/api/test/no "} />);

    //Expect
    await waitFor(() => {
      return expect(screen.getByText("No Articles Here Yet")).toBeDefined();
    });
  });
  test("Renders 3 teasers expect", async () => {
    //Arrange
    const user: APIUsers = {
      userId: "1",
      authority: EAuthority.publisher,
      name: "fist",
      picture: "http://test.no",
      loginType: ELoginType.github,
      email: "",
    };
    const reactionCounter: APIReactionCounter = {
      articleId: "1",
      reaction: {
        [ReactionsEmoji.HART]: 0,
        [ReactionsEmoji.LAUGHING]: 0,
        [ReactionsEmoji.THUMBS_UP]: 0,
      },
    };
    const articles: APIArticle[] = [
      {
        userId: "1",
        articleId: "1",
        text: "text1",
        timeStamp: Date.now(),
        title: "title1",
      },
      {
        userId: "1",
        articleId: "2",
        text: "text2",
        timeStamp: Date.now(),
        title: "title2",
      },
      {
        userId: "1",
        articleId: "3",
        text: "text3",
        timeStamp: Date.now(),
        title: "title3",
      },
    ];
    const getAllArticlesSpy = vi.spyOn(articleService, "getAllArticles");
    const getArticleDetailsSpy = vi.spyOn(articleService, "getArticleDetails");
    getAllArticlesSpy.mockResolvedValue(articles);
    getArticleDetailsSpy.mockResolvedValue([user, reactionCounter]);

    //Act
    render(<ArticleFeature user={user} articlesEndpoint={"/api/test/no "} />);

    //Expect
    await waitFor(() => {
      return expect(screen.getByText("title1")).toBeDefined();
    });
    expect(screen.getByText("title2")).toBeDefined();
    expect(screen.getByText("title3")).toBeDefined();
  });

  test("Renders 1 teasers and open ReadMode ", async () => {
    //Arrange
    const user: APIUsers = {
      userId: "1",
      authority: EAuthority.publisher,
      name: "fist",
      picture: "http://test.no",
      loginType: ELoginType.github,
      email: "",
    };
    const reactionCounter: APIReactionCounter = {
      articleId: "1",
      reaction: {
        [ReactionsEmoji.HART]: 0,
        [ReactionsEmoji.LAUGHING]: 0,
        [ReactionsEmoji.THUMBS_UP]: 0,
      },
    };
    const articles: APIArticle[] = [
      {
        userId: "1",
        articleId: "1",
        text: "text1",
        timeStamp: Date.now(),
        title: "title1",
      },
    ];
    const reactionAndUsers: APIReactionAndUser[] = [];
    const getAllArticlesSpy = vi.spyOn(articleService, "getAllArticles");
    const getArticleDetailsSpy = vi.spyOn(articleService, "getArticleDetails");
    const getReactionInfoSpy = vi.spyOn(reactionService, "getReactionInfo");
    getAllArticlesSpy.mockResolvedValue(articles);
    getArticleDetailsSpy.mockResolvedValue([user, reactionCounter]);
    getReactionInfoSpy.mockResolvedValue([reactionAndUsers, reactionCounter]);

    //Act
    render(<ArticleFeature user={user} articlesEndpoint={"/api/test/no "} />);
    await waitFor(() => screen.getByText("title1"));
    fireEvent.click(screen.getByText("title1"));

    //Expect
    await waitFor(() => {
      return expect(screen.getByText("Edit")).toBeDefined();
    });
  });

  test("Renders 1 teasers and open ReadMode and then EditMode ", async () => {
    //Arrange
    const user: APIUsers = {
      userId: "1",
      authority: EAuthority.publisher,
      name: "fist",
      picture: "http://test.no",
      loginType: ELoginType.github,
      email: "",
    };
    const reactionCounter: APIReactionCounter = {
      articleId: "1",
      reaction: {
        [ReactionsEmoji.HART]: 0,
        [ReactionsEmoji.LAUGHING]: 0,
        [ReactionsEmoji.THUMBS_UP]: 0,
      },
    };
    const articles: APIArticle[] = [
      {
        userId: "1",
        articleId: "1",
        text: "text1",
        timeStamp: Date.now(),
        title: "title1",
      },
    ];
    const reactionAndUsers: APIReactionAndUser[] = [];
    const getAllArticlesSpy = vi.spyOn(articleService, "getAllArticles");
    const getArticleDetailsSpy = vi.spyOn(articleService, "getArticleDetails");
    const getReactionInfoSpy = vi.spyOn(reactionService, "getReactionInfo");
    getAllArticlesSpy.mockResolvedValue(articles);
    getArticleDetailsSpy.mockResolvedValue([user, reactionCounter]);
    getReactionInfoSpy.mockResolvedValue([reactionAndUsers, reactionCounter]);

    //Act
    render(<ArticleFeature user={user} articlesEndpoint={"/api/test/no "} />);
    await waitFor(() => screen.getByText("title1"));
    fireEvent.click(screen.getByText("title1"));
    await waitFor(() => screen.getByText("Edit"));
    fireEvent.click(screen.getByText("Edit"));

    //Expect
    await waitFor(() => {
      return expect(screen.getByText("Change To Read Mode")).toBeDefined();
    });
  });
});
